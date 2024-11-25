function renderBooks(sortBy = "Default") {
  const booksWrapper = document.querySelector(".books");
  const loadingIndicator = document.querySelector(".books__loading");

  if (!booksWrapper) return;

  let books = getBooks();

  if (loadingIndicator) {
    loadingIndicator.style.display = "block";
    loadingIndicator.style.opacity = "1";
  }

  booksWrapper.style.opacity = "0";

  setTimeout(() => {
    if (sortBy === "LOW_TO_HIGH") {
      books.sort((a, b) => {
        const priceA = a.salePrice ?? a.originalPrice;
        const priceB = b.salePrice ?? b.originalPrice;
        return priceA - priceB;
      });
    } else if (sortBy === "HIGH_TO_LOW") {
      books.sort((a, b) => {
        const priceA = a.salePrice ?? a.originalPrice;
        const priceB = b.salePrice ?? b.originalPrice;
        return priceB - priceA;
      });
    } else if (sortBy === "RATING") {
      books.sort((a, b) => b.rating - a.rating);
    }

    const maxStars = 5;

    const booksHtml = books
      .map((book) => {
        const fullStars = Math.floor(book.rating);
        const halfStar = book.rating % 1 !== 0;
        const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

        const starsHtml = ` 
          ${'<i class="fas fa-star"></i>'.repeat(fullStars)}
          ${halfStar ? '<i class="fas fa-star-half-alt"></i>' : ""}
          ${'<i class="far fa-star"></i>'.repeat(emptyStars)}
        `;

        const priceHtml = book.salePrice
          ? ` 
            <span class="book__price--normal book__price--strikethrough">$${book.originalPrice.toFixed(
              2
            )}</span>
            <span class="book__price--sale">$${book.salePrice.toFixed(2)}</span>
          `
          : `<span class="book__price--normal">$${book.originalPrice.toFixed(
              2
            )}</span>`;

        return ` 
          <div class="book">
            <figure class="book__img--wrapper">
              <img class="book__img" src="${book.url}" alt="${book.title}">
            </figure>
            <div class="book__title">${book.title}</div>
            <div class="book__ratings">${starsHtml}</div>
            <div class="book__price">${priceHtml}</div>
          </div>`;
      })
      .join("");

    booksWrapper.innerHTML = booksHtml;

    booksWrapper.style.opacity = "1";

    if (loadingIndicator) {
      loadingIndicator.style.display = "none";
      loadingIndicator.style.opacity = "0";
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  renderBooks();

  const filterSelect = document.querySelector("#filter");

  if (filterSelect) {
    filterSelect.addEventListener("change", (event) => {
      const sortBy = event.target.value;
      renderBooks(sortBy);
    });
  }
});

// FAKE DATA
function getBooks() {
  return [
    {
      id: 1,
      title: "Crack the Coding Interview",
      url: "assets/crack the coding interview.png",
      originalPrice: 49.95,
      salePrice: 14.95,
      rating: 4.5,
    },
    {
      id: 2,
      title: "Atomic Habits",
      url: "assets/atomic habits.jpg",
      originalPrice: 39,
      salePrice: null,
      rating: 5,
    },
    {
      id: 3,
      title: "Deep Work",
      url: "assets/deep work.jpeg",
      originalPrice: 29,
      salePrice: 12,
      rating: 5,
    },
    {
      id: 4,
      title: "The 10X Rule",
      url: "assets/book-1.jpeg",
      originalPrice: 44,
      salePrice: 19,
      rating: 4.5,
    },
    {
      id: 5,
      title: "Be Obsessed Or Be Average",
      url: "assets/book-2.jpeg",
      originalPrice: 32,
      salePrice: 17,
      rating: 4,
    },
    {
      id: 6,
      title: "Rich Dad Poor Dad",
      url: "assets/book-3.jpeg",
      originalPrice: 70,
      salePrice: 12.5,
      rating: 5,
    },
    {
      id: 7,
      title: "Cashflow Quadrant",
      url: "assets/book-4.jpeg",
      originalPrice: 11,
      salePrice: 10,
      rating: 4,
    },
    {
      id: 8,
      title: "48 Laws of Power",
      url: "assets/book-5.jpeg",
      originalPrice: 38,
      salePrice: 17.95,
      rating: 4.5,
    },
    {
      id: 9,
      title: "The 5 Second Rule",
      url: "assets/book-6.jpeg",
      originalPrice: 35,
      salePrice: null,
      rating: 4,
    },
    {
      id: 10,
      title: "Your Next Five Moves",
      url: "assets/book-7.jpg",
      originalPrice: 40,
      salePrice: null,
      rating: 4,
    },
    {
      id: 11,
      title: "Mastery",
      url: "assets/book-8.jpeg",
      originalPrice: 30,
      salePrice: null,
      rating: 4.5,
    },
  ];
}
