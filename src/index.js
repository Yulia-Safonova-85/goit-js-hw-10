import './css/styles.css';

import debounce from "lodash.debounce";

import { fetchCountries } from './fetchCountries.js';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');

input.addEventListener('input', debounce(onInputMessage, DEBOUNCE_DELAY));

function onInputMessage(evt) {
    evt.preventDefault();

    let inputCountry = evt.target.value.trim();
    

}

// const response = fetch('https://restcountries.com/v3.1/all?fields=name.official,capital,population,flags.svg,languages')

// response.then(resp => resp.json()).then(data => console.log(data))