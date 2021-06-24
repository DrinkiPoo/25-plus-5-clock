import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Dick Muncher",
    };
    console.log("------constructor--------");
  }

  componentDidMount() {
    console.log("------componentDidMount--------");
    this.setState({ name: "Karen Titsgalore" });
  }
  componentDidUpdate() {
    console.log("------componentDidUpdate--------");
  }
  render() {
    console.log("------render--------");
    return (
      <div className="App" style={{ padding: 50 }}>
        {this.state.name}
      </div>
    );
  }
}

export default App;
