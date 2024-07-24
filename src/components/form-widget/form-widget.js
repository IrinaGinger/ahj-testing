import './form-widget.css';

import isValidCard from '../../js/validators/card-number-validator';
import paySystem from '../../js/validators/pay-system-validator';

export default class CardFormWidget {
    constructor(parentEl) {
        this.parentEl = parentEl;

        this.onSubmit = this.onSubmit.bind(this);
    }

    static get markup() {
        return `
        <form class="card-form-widget">
            <div class="card-system-icons">
                <img class="card-system-item grey" src="img/visa.svg" alt="visa">
                <img class="card-system-item grey" src="img/mastercard.svg" alt="mastercard">
                <img class="card-system-item grey" src="img/american-express.svg" alt="american-express">
                <img class="card-system-item grey" src="img/discover.svg" alt="discover">
                <img class="card-system-item grey" src="img/jcb.svg" alt="jcb">
                <img class="card-system-item grey" src="img/mir.svg" alt="mir">
            </div>
            <div class="control">
                <label for="card-input"></label>
                <input type="text" id="card-input" class="input">
                <button class="submit">Click to validate</button>
            </div>
        </form>
        `;
    }

    static get submitSelector() {
        return '.submit';
    }

    static get inputSelector() {
        return '.input';
    }

    static get selector() {
        return '.card-form-widget';
    }

    bindToDOM() {
        this.parentEl.innerHTML = CardFormWidget.markup;

        this.element = this.parentEl.querySelector(CardFormWidget.selector);
        this.submit = this.element.querySelector(CardFormWidget.submitSelector);
        this.input = this.element.querySelector(CardFormWidget.inputSelector);

        this.element.addEventListener('submit', this.onSubmit);
    }

    onSubmit(e) {
        e.preventDefault();

        const value = this.input.value;

        if(isValidCard(value)) {
            this.input.classList.add('valid');
            this.input.classList.remove('invalid');
        } else {
            this.input.classList.add('invalid');
            this.input.classList.remove('valid');
        }
    }
}