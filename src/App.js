import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Audio from "./audio";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      session_seconds: 1500,
      break_seconds: 300,
      active: false,
      display: "Session",
    };
    this.change = this.change.bind(this);
    this.play = this.play.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.setState((state) => ({
      breakLength: 5,
      sessionLength: 25,
      session_seconds: 1500,
      break_seconds: 300,
      active: false,
      display: "Session",
    }));
    clearInterval(this.myInterval);
    document.getElementById("beep").load();
  }

  change(name, name_seconds, action) {
    this.setState((state) => ({
      [name]:
        action === "up"
          ? state[name] < 60
            ? state[name] + 1
            : state[name]
          : state[name] > 1
          ? state[name] - 1
          : state[name],
      [name_seconds]:
        action === "up"
          ? state[name_seconds] < 3600
            ? state[name_seconds] + 60
            : state[name_seconds]
          : state[name_seconds] > 60
          ? state[name_seconds] - 60
          : state[name_seconds],
    }));
  }

  play() {
    if (this.state.active === true) {
      clearInterval(this.myInterval);
      this.setState((state) => ({
        active: false,
      }));
    } else {
      this.myInterval = setInterval(() => {
        if (this.state.display === "Session") {
          if (this.state.session_seconds === 0) {
            document.getElementById("beep").play();
            this.setState((state) => ({
              display: "Break",
              session_seconds: state.sessionLength * 60,
            }));
          } else {
            this.setState((state) => ({
              session_seconds: state.session_seconds - 1,
              active: true,
            }));
          }
        } else {
          if (this.state.break_seconds === 0) {
            document.getElementById("beep").play();
            this.setState((state) => ({
              display: "Session",
              break_seconds: state.breakLength * 60,
            }));
          } else {
            this.setState((state) => ({
              break_seconds: state.break_seconds - 1,
              active: true,
            }));
          }
        }
      }, 1000);
    }
  }

  render() {
    const time =
      this.state.display === "Session"
        ? this.state.session_seconds
        : this.state.break_seconds;
    console.log("---rendering----");

    const min_ = Math.floor(time / 60);
    const min = min_ > 9 ? min_ : "0" + min_;
    const sec_ = (time - 60 * Math.floor(time / 60)).toString();
    const sec = sec_ > 9 ? sec_ : "0" + sec_;
    return (
      <div className="App">
        <div className="my-container">
          <div className="heading">
            <h1>25 + 5 Clock</h1>
          </div>
          <div className="clock">
            <div id="break-label">
              <h2>Break Length</h2>
              <div className="trio">
                <button
                  id="break-increment"
                  className="btn btn-primary"
                  onClick={() =>
                    this.change("breakLength", "break_seconds", "up")
                  }
                >
                  up
                </button>
                <h1 id="break-length">{this.state.breakLength}</h1>
                <button
                  id="break-decrement"
                  className="btn btn-primary"
                  onClick={() =>
                    this.change("breakLength", "break_seconds", "down")
                  }
                >
                  down
                </button>
              </div>
            </div>
            <div id="session-label">
              <h2>Session Length</h2>
              <div className="trio">
                <button
                  id="session-increment"
                  className="btn btn-primary"
                  onClick={() =>
                    this.change("sessionLength", "session_seconds", "up")
                  }
                >
                  up
                </button>
                <h1 id="session-length">{this.state.sessionLength}</h1>
                <button
                  id="session-decrement"
                  className="btn btn-primary"
                  onClick={() =>
                    this.change("sessionLength", "session_seconds", "down")
                  }
                >
                  down
                </button>
              </div>
            </div>
          </div>
          <div className="holder">
            <div id="timer-label">
              <h1>{this.state.display}</h1>
              <div>
                <h1 id="time-left">
                  {min}:{sec}
                </h1>
              </div>
            </div>
          </div>
          <div className="buttons">
            <button
              className="btn btn-primary"
              id="start_stop"
              onClick={this.play}
            >
              play
            </button>
            <button className="btn btn-primary" id="reset" onClick={this.reset}>
              reset
            </button>
          </div>
        </div>
        <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    );
  }
}

export default App;
