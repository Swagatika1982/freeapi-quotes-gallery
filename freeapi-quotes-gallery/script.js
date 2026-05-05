const quotesContainer = document.getElementById("quotesContainer");
const loadQuotesBtn = document.getElementById("loadQuotesBtn");

const API_URL = "https://api.freeapi.app/api/v1/public/quotes";

async function fetchQuotes() {
  try {
    quotesContainer.innerHTML = "<p>Loading quotes...</p>";

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch quotes");
    }

    const result = await response.json();

    const quotes = result.data.data;

    displayQuotes(quotes);
  } catch (error) {
    quotesContainer.innerHTML = `
      <p class="error">Something went wrong. Please try again.</p>
    `;
    console.log(error);
  }
}

function displayQuotes(quotes) {
  quotesContainer.innerHTML = "";

  quotes.forEach((quote) => {
    const quoteCard = document.createElement("div");
    quoteCard.className = "quote-card";

    quoteCard.innerHTML = `
      <p>"${quote.content}"</p>
      <h3>- ${quote.author}</h3>
    `;

    quotesContainer.appendChild(quoteCard);
  });
}

loadQuotesBtn.addEventListener("click", fetchQuotes);

fetchQuotes();