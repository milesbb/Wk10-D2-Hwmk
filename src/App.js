import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import WarningSign from './components/WarningSign';
import MyBadge from './components/MyBadge';

function App() {
  return (
    <div className="App">
      <h1>hello</h1>
      <WarningSign text="Test text" />
      <MyBadge text="test" color="green" />
    </div>
  );
}

export default App;
