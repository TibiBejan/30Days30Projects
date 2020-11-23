const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector('#search-form input');
const url = 'https://www.googleapis.com/books/v1/volumes?';
let searchQuery;

// EVENT LISTENERS
searchForm.addEventListener('submit', getBooks);
searchInput.addEventListener('keyup', getBooks);


async function getBooks(e){
    e.preventDefault();
    searchQuery = searchInput.value;

    if(searchQuery === ''){ return; }

    const books = await fetchPreviewBooks(searchQuery);
    const booksArr = books.map(book => {
        const volumeInfo = book.volumeInfo;
        const { title: volumeTitle, authors: volumeAuthor, description: volumeDescription, averageRating: volumeRating, imageLinks: volumeThumbnail, infoLink: volumeLink } = volumeInfo;

        return {volumeTitle, volumeAuthor, volumeDescription, volumeRating, volumeThumbnail, volumeLink};
    });

    displayBooks(booksArr);
}

function displayBooks(books){
    const books_div = document.querySelector('.container');

    let bookHTML = books.map(book => `
        <div class="book">
            <div class="book-image">
                <img src="${book.volumeThumbnail.thumbnail}" alt="${book.volumeTitle}">
            </div>
            <div class="book-details">
                <h2 class="heading-two mb-small">${book.volumeTitle}</h2>
                <p class="paragraph mb-small">${book.volumeAuthor}</p>
                <button type="button" class="button primary-button">Details
                    <i class="fas fa-info-circle"></i>
                </button>
            </div>
        </div>
    `).join('');

    books_div.innerHTML = bookHTML;
}

// FUNCTION TO FETCH PREVIEW BOOKS
async function fetchPreviewBooks(searchQuery){
    const response = await fetch(`${url}q=${searchQuery}&maxResults=20`);

    try{
        const data = await response.json();
        return data.items;
    } catch(error) {
        console.log(error);
    }
}