import './css/styles.css';

import debounce from "lodash.debounce";

import { fetchCountries } from './fetchCountries.js';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');



input.addEventListener('input', debounce(onInputMessage, DEBOUNCE_DELAY));

function onInputMessage(evt) {
    evt.preventDefault();

    let inputCountry = evt.target.value.trim();
    if (inputCountry) {
        return fetchCountries(inputCountry)
            .then(data => {
        selectCountry(data);
      })
            .catch(err => {Notify.failure('Oops, there is no country with that name')})
    }
}

function selectCountry(arr) {
    if (arr.length === 1) {

        list.innerHTML = '';
        return createFullMarkup(arr);
    }
    if (arr.length >= 2 && arr.length <= 10) {
        countryInfo.innerHTML = '';
        return createMarkup(arr);
    }
    return Notify.info(
        'Too many matches found. Please enter a more specific name.'
    );
}


function createMarkup(data) {
    const markup = data.map((el) =>
        `<li>
  <img src="${el.flags.svg}" alt="${el.name.official}" width = "40" height ="20"
</img>
<p>${el.name.official}</p>
</li>`)
    list.innerHTML = markup.join('');
    list.style.listStyle = 'none';
    list.style.padding = '10px';
    list.style.margin = '0';
}

function createFullMarkup(data) {
    const markup = data.map((el) =>
    `<h1> <img src="${el.flags.svg}" alt="${el.name.official}" width = "40" height ="20" </img>
${el.name.official}
        </h1>
<ul>
  <li>
    <p>Capital: ${el.capital}</p>
  </li>
  <li>
    <p>Population: ${el.population}</p>
  </li>
  <li>
    <p>Languages: ${Object.values(el.languages).join(',')}</p>
  </li>
</ul>`)
    countryInfo.innerHTML = markup.join('');
    countryInfo.style.listStyle = 'none';
    countryInfo.style.padding = '10px';
    countryInfo.style.margin = '0';
}
