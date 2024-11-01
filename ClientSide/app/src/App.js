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
      <div class="block-one">
        <div class="section-left">
          Explore ideas and collaborate to build projects
        </div>
        <div class="section-right">
          <div class="picture">
            <p class="picture-text">
              Here you will see an authentic picture respresenting our company
            </p>
          </div>
        </div>
      </div>
      <div class="dotted-container">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="block-two">
        <div class="authenticate">
          <button>Log in</button>
          or
          <button>Sign up</button>
          and create your profile
        </div>
      </div>
      <div class="dotted-container">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="block-three">
        <div class="section-left">Apply to join projects</div>
        <div class="section-right">
          <div class="project-container">
            <div class="container"></div>
            <div class="container"></div>
            <div class="container"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
