const API_KEY = "AIzaSyAJi6mSXNZrzfPSajIGlGfOkXlZLlJ7P2o";

function searchBooks() {
  const searchQuery = document.getElementById("searchInput").value;
  const resultsSection = document.getElementById("results");

  resultsSection.innerHTML = "";

  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      const books = data.items;

      if (books) {
        books.forEach((book) => {
          const bookElement = document.createElement("article");
          bookElement.classList.add("book");

          const title = book.volumeInfo.title;
          const author = book.volumeInfo.authors
            ? book.volumeInfo.authors.join(", ")
            : "Autor Desconocido";
          const description =
            book.volumeInfo.description || "Sin descripción disponible";
          const averageRating =
            book.volumeInfo.averageRating || "No disponible";
          const thumbnail = book.volumeInfo.imageLinks
            ? book.volumeInfo.imageLinks.thumbnail
            : "No disponible";

          bookElement.innerHTML = `
                        <h2>${title}</h2>
                        <img src="${thumbnail}" alt="${title} Cover" />
                        <p>Autor: ${author}</p>
                        <p>${description}</p>
                        <p>Calificación: ${averageRating}</p>
                    `;

          resultsSection.appendChild(bookElement);
        });
      } else {
        resultsSection.innerHTML = "<p>No se encontraron resultados.</p>";
      }
    })
    .catch((error) => console.error("Error al buscar libros:", error));
}
