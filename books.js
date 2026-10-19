const message = document.getElementById("message");
const table = document.getElementById("book-table");

function getBookText(book, tagName) {
  return book.querySelector(tagName)?.textContent.trim() || "Not provided";
}

async function loadBooks() {
  try {
    // 1. Fetch the XML file.
    const response = await fetch("book.xml");

    // fetch() only rejects for network failures. Check HTTP errors explicitly.
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // 2. Read the response as text and parse it as XML.
    const xmlText = await response.text();
    const xmlDoc = new DOMParser().parseFromString(xmlText, "application/xml");

    if (xmlDoc.querySelector("parsererror")) {
      throw new Error("book.xml is not valid XML.");
    }

    const books = [...xmlDoc.querySelectorAll("book")];

    if (books.length === 0) {
      throw new Error("No <book> elements were found in book.xml.");
    }

    // 3. Render the parsed data in the HTML table.
    table.querySelector("tbody").innerHTML = books.map((book) => {
      const price = book.querySelector("price");
      const priceAmount = price?.textContent.trim() || "Not provided";
      const currency = price?.getAttribute("currency") || "";
      const id = book.getAttribute("id") || "Not provided";

      return `
        <tr>
          <td>${id}</td>
          <td>${getBookText(book, "title")}</td>
          <td>${getBookText(book, "author")}</td>
          <td>${priceAmount} ${currency}</td>
        </tr>
      `;
    }).join("");

    message.textContent = `Loaded ${books.length} books from book.xml.`;
    message.className = "success";
    table.hidden = false;
  } catch (error) {
    console.error(`Could not load books: ${error}`);
    message.textContent = `Could not load books: ${error.message}`;
    message.className = "error";
  }
}

loadBooks();