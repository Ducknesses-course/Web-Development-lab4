# Topic 5 Lab 4

## Pages

- `index.html` - links to the two demo pages
- `books.html` - loads `book.xml` and displays the books
- `profiles.html` - loads `userProfiles.json` and displays the profiles

## Run

Browsers block `fetch()` when a page is opened with `file://`, so use a local server:

```powershell
cd D:\Massey_Semester5\WebDevelopment\Topic5\lab4-simple
python -m http.server 8000
```

Then open <http://localhost:8000/>.