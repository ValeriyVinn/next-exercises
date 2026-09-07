const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const notificationBox = document.querySelector('#notification');

const DEBOUNCE_DELAY = 300;

// Простий debounce
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

countryInput.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));

function onCountryInput() {
  const name = countryInput.value.trim();
  if (name === '') {
    clearInnerHTML();
    return;
  }

  fetchCountries(name)
    .then(country => {
      clearInnerHTML();

      if (country.length === 1) {
        countryInfo.insertAdjacentHTML('beforeend', markupCountryInfo(country));
      } else if (country.length >= 10) {
        showNotification('Too many matches found. Please enter a more specific name.', 'info');
      } else {
        countryList.insertAdjacentHTML('beforeend', markupCountryList(country));
      }
    })
    .catch(error => {
      if (error.message === '404') {
        showNotification('Oops, there is no country with that name', 'error');
      }
      clearInnerHTML();
      console.log(error.message);
    });
}

function fetchCountries(name) {
  const countriesBase = 'https://restcountries.com/v3.1/name/';
  const countriesInfoFields = 'fields=name,capital,population,flags,languages';

  return fetch(`${countriesBase}${name}?${countriesInfoFields}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
}

function markupCountryList(country) {
  return country
    .map(({ name, flags }) => `
      <li class="country-list__item">
        <img class="country-list__item--flag" src="${flags.svg}" alt="Flag of ${name.official}">
        <h2 class="country-list__item--name">${name.official}</h2>
      </li>
    `)
    .join('');
}

function markupCountryInfo(country) {
  return country
    .map(({ name, flags, capital, population, languages }) => `
      <ul class="country-info__list">
        <li class="country-info__item">
          <img class="country-info__item--flag" src="${flags.svg}" alt="Flag of ${name.official}">
          <h2 class="country-info__item--name">${name.official}</h2>
        </li>
        <li class="country-info__item"><b>Capital:</b> ${capital}</li>
        <li class="country-info__item"><b>Population:</b> ${population}</li>
        <li class="country-info__item"><b>Languages:</b> ${Object.values(languages).join(', ')}</li>
      </ul>
    `)
    .join('');
}

function clearInnerHTML() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function showNotification(message, type = 'info') {
  notificationBox.textContent = message;
  notificationBox.className = `notification ${type}`;
  notificationBox.classList.add('show');

  setTimeout(() => {
    notificationBox.classList.remove('show');
  }, 3000);
}