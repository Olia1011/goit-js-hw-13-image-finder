const baseUrl = 'https://pixabay.com/api/';
const key = '16030108-62f306d6543cc766a6e8f4e47';

export default {
  page: 1,
  query: '',
  fetchImages() {
    return fetch(
      `${baseUrl}/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${key}`,
    )
      .then(response => response.json()).then(parsedResponse => {
        this.incrementPage();
        return parsedResponse.hits;
      });
  },
  get searchQuery() {
    return this.query;
  },
  set searchQuery(string) {
    this.query = string;
  },

  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
};
