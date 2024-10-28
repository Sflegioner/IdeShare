import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <nav class="navbar">
        <div class="left">
          <ul>
            <li>
              <img id="logo" alt="logo" src="icon3.png"></img> IdeShare
            </li>

            <li>All posts</li>
            <li>
              <input class="nav-input"></input>
            </li>
          </ul>
        </div>
        <div class="right">
          <ul>
            <li>
              <button id="create-button">Create a post</button>
            </li>
            <li>Profile</li>
          </ul>
        </div>
      </nav>
      <div class="section-left"></div>
      <div class="section-right"></div>
    </div>
  );
}

export default App;
