import Home from './pages/Home'
import AddRecording from './pages/AddRecording'
import UpdateRecording from './pages/UpdateRecording'
import { Link, Route} from "react-router-dom";

function App() {
  return (
    <div>
      <nav className="navbar navbar-light">
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#"><Link to="/">Home</Link></a>
          </li> 
          <li className="nav-item">
            <a className="nav-link" href="#"><Link to="/addRecording">addRecording</Link></a>
          </li> 
        </ul>
      </nav>

      { /* Route components are rendered if the path prop matches the current URL */}
      <Route exact path="/"><Home /></Route>
      <Route exact path="/addRecording"><AddRecording /></Route>
      <Route path="/addRecording/:id"><UpdateRecording /></Route>
    </div>
  );
}

export default App;
