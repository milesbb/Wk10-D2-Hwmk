import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import WarningSign from './components/WarningSign';

function App() {
  return (
    <div className="App">
      <h1>hello</h1>
      <WarningSign text="Test text" />
    </div>
  );
}

export default App;
