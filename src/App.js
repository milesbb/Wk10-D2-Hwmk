import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import WarningSign from './components/WarningSign';
import MyBadge from './components/MyBadge';
import BookList from './components/BookList';
import MyNav from './components/MyNav';
// import books from "./books/history.json";

function App() {
  return (
    <div className="App">
      <MyNav />
      <h1>Book Finder</h1>
      <WarningSign text="Test text" />
      <MyBadge text="test" color="green" />
      <BookList />
    </div>
  );
}

export default App;
