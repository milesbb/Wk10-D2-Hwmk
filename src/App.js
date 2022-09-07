import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BookList from "./components/BookList";
import MyNav from "./components/MyNav";

function App() {
  return (
    <div className="App">
      <MyNav />
      <h1>Book Finder</h1>
      <BookList />
    </div>
  );
}

export default App;
