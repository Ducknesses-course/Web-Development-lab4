# Topic 5 Lab 4

## Pages

- `index.html` - links to the two demo pages
- `books.html` - fetches `book.xml`, parses it with `DOMParser`, and displays the books
- `profiles.html` - fetches `userProfiles.json`, parses it with `response.json()`, and displays the profiles

## Fetch implementation

Both pages use the `async/await` pattern demonstrated in `week5demo`:

1. `await fetch(...)`
2. Check `response.ok` and throw an error for HTTP failures
3. Read the body with `response.text()` for XML or `response.json()` for JSON
4. Render the data
5. Catch errors with `try/catch`

## Run

Browsers block `fetch()` when a page is opened with `file://`, so use a local server:

```powershell
cd D:\Massey_Semester5\WebDevelopment\Topic5\lab4-simple
python -m http.server 8000
```

Then open <http://localhost:8000/>.