const searchForm = document.getElementById('search-form');
const url = 'https://www.googleapis.com/books/v1/volumes?';
let searchQuery;

// EVENT LISTENERS
searchForm.addEventListener('submit', getBooks);

async function getBooks(e){
    e.preventDefault();
    const searchInput = document.querySelector('#search-form input');
    searchQuery = searchInput.value.split(' ').join('+');

    if(searchQuery === ''){ return; }

    const books = await fetchPreviewBooks(searchQuery);
    const booksArr = books.map(book => {
        const volumeInfo = book.volumeInfo;
        const { title: volumeTitle, authors: volumeAuthor, description: volumeDescription, imageLinks: volumeThumbnail, infoLink: volumeLink } = volumeInfo;

        return { volumeTitle, volumeAuthor, volumeDescription, volumeThumbnail, volumeLink };
    });

    displayBooks(booksArr);
}

function displayBooks(books){
    const books_div = document.querySelector('.container');

    const bookHTML = books.map(book => `
    <div class="book">
        <div class="book-image">
            <img src="${book.volumeThumbnail.thumbnail}" src="${book.volumeTitle}">
        </div>
        <div class="book-details">
            <h2 class="heading-two mb-small">${book.volumeTitle}</h2>
            <p class="paragraph mb-small">${book.volumeAuthor}</p>
            <a href="${book.volumeLink}" target="blank"class="button primary-button">Details
                <i class="fas fa-info-circle"></i>
            </a>
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