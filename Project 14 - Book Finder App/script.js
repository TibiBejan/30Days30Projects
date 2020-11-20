const url = 'https://www.googleapis.com/books/v1/volumes?';

// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', getBooks);

async function getBooks(){
    const data = await fetchPreviewBooks();

    const books = data.map((book, index) => ({
        id: index,
        author : book.volumeInfo.authors[0],
        title: book.volumeInfo.title,
        publisher : book.volumeInfo.publisher,
        rating : book.volumeInfo.averageRating,
        categories : book.volumeInfo.categories.join(', '),
        description : book.volumeInfo.description,
        thumbnail : book.volumeInfo.imageLinks.thumbnail,
        previewLink : book.volumeInfo.previewLink,
        storeLink : book.volumeInfo.infoLink
    }));
}

// FUNCTION TO FETCH PREVIEW BOOKS
async function fetchPreviewBooks(){
    const response = await fetch(`${url}q=author:george+r+r+martin&maxResults=6`);

    try{
        const data = await response.json();
        return data.items;
    } catch(error) {
        console.log(error)
    }
}