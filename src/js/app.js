import CardFormWidget from "../components/form-widget/form-widget";

const container = document.querySelector('.container');
const form = new CardFormWidget(container);


form.bindToDOM();