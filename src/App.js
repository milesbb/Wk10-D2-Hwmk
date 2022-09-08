import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BookList from "./components/BookList";
import MyNav from "./components/MyNav";
import books from "./books/history.json";

function App() {
  return (
    <div className="App">
      <MyNav />
      <h1>Book Finder</h1>
      <h3>Click a book to see/add comments!</h3>
      <BookList books={books}/>
    </div>
  );
}

export default App;
