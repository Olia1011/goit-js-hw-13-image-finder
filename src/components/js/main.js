import apiService from '../../services/apiService';
import collectionElement from '../../templates/picture.hbs';
import debounce from 'lodash.debounce';
import scroll from'./scroll';

const refs = {
  collection: document.querySelector('.gallery'),
  searchForm: document.forms.searchForm,
  query: document.forms.searchForm.elements.query,
  btn: document.querySelector('button[data-action="load"]'),
  
};

refs.query.addEventListener('input', debounce(search, 300));
refs.btn.addEventListener('click', loadMoreBtnHandler);

function search(e) {
  e.preventDefault();
  const inputValue = refs.query.value;
  clearListItems();
  apiService.resetPage();
  apiService.searchQuery = inputValue;
  apiService.fetchImages().then(data => findOutImages(data)).catch(error => console.error('ERROR--', error));
}

function findOutImages(data) {
  const markup = data.map(image => collectionElement(image)).join('');
  refs.collection.insertAdjacentHTML('beforeend', markup);
}

function loadMoreBtnHandler() {
  apiService.fetchImages().then(data => findOutImages(data)).finally(() => scroll());
}

function clearListItems() {
  refs.collection.innerHTML = '';
}


