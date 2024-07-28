import './form-widget.css';

import isValidCard from '../../js/validators/card-number-validator';
import paySystem from '../../js/validators/pay-system-validator';

import visa from '../../img/visa.svg';
import mastercard from '../../img/mastercard.svg';
import americanExpress from '../../img/american-express.svg';
import discover from '../../img/discover.svg';
import jcb from '../../img/jcb.svg';
import mir from '../../img/mir.svg';

export default class CardFormWidget {
    constructor(parentEl) {
        this.parentEl = parentEl;

        this.onSubmit = this.onSubmit.bind(this);
        this.onInput = this.onInput.bind(this);

        this.cardSystems = [
            ['visa', visa, [4]], 
            ['mastercard', mastercard, [5]],
            ['american-express', americanExpress, [37]],
            ['discover', discover, [60, 65]],
            ['jcb', jcb, [35]],
            ['mir', mir, [22]],
        ];

        this.currentCardSystem = null;
    }
    
    static markup(cardSystems) {
        const cardFormWidget = document.createElement('form');
        cardFormWidget.classList.add("card-form-widget");

        const cardSystemIcons = document.createElement('div');
        cardSystemIcons.classList.add("card-system-icons");

        let cardSystemItem;

        cardSystems.forEach(item => {
            cardSystemItem = document.createElement('img');
            cardSystemItem.classList.add("card-system-item", "grey", item[0]);
            cardSystemItem.src = item[1];
            cardSystemItem.alt = item[0];

            cardSystemIcons.appendChild(cardSystemItem);
        });
         
        cardFormWidget.appendChild(cardSystemIcons);

        const control = document.createElement('div');
        control.classList.add("control");

        control.innerHTML = `
            <label for="card-input"></label>
            <input type="text" id="card-input" class="input">
            <button class="submit">Click to validate</button>
        `;

        cardFormWidget.appendChild(control);

        return cardFormWidget;
    }

    static get submitSelector() {
        return '.submit';
    }

    static get inputSelector() {
        return '.input';
    }

    static get imgSelector() {
        return '.card-system-item';
    }

    static get selector() {
        return '.card-form-widget';
    }

    bindToDOM() {
        this.parentEl.append(CardFormWidget.markup(this.cardSystems));

        this.element = this.parentEl.querySelector(CardFormWidget.selector);
        this.cardSystemElements = this.element.querySelectorAll(CardFormWidget.imgSelector);
        this.submit = this.element.querySelector(CardFormWidget.submitSelector);
        this.input = this.element.querySelector(CardFormWidget.inputSelector);

        this.input.addEventListener('input', this.onInput);
        this.element.addEventListener('submit', this.onSubmit);
    }

    onSubmit(e) {
        e.preventDefault();

        const value = this.input.value;

        if(isValidCard(value)) {
            this.input.classList.add('valid');
        } else {
            this.input.classList.remove('valid');
        }
    }

    onInput(e) {
        e.preventDefault();
        
        const text = this.input.value;
        let paySystemName;
        
        let systems = this.cardSystems;
        
        paySystemName = paySystem(text, systems);

        console.log(paySystemName);

        if (!paySystemName) {
            if (this.currentCardSystem && !this.currentCardSystem.classList.contains('grey')) {
                this.currentCardSystem.classList.add('grey');
            }
            this.currentCardSystem = null;
            return;
        }

        this.cardSystemElements.forEach(elem => {
            if (elem.classList.contains(paySystemName)) {
                elem.classList.remove('grey');
                this.currentCardSystem = elem;
            }
        })
    }

}