import React, { Component } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';
import RoomSensors from './components/roomsensors'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/rooms')
      .then(res => {
        this.setState({ rooms: res.data.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    const { rooms } = this.state;
    console.log(rooms)
    return (
      <Router>
        <div className="App">
          <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
              <a className="navbar-brand">Project: </a>
              <button className="navbar-toggler" type="button" datatoggle="collapse" data-target="#navbarSupportedContent" ariacontrols="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  {rooms.map(r => (
                    <li className="nav-item" key={r.room}>
                      <Link className="nav-link" to={`/room/${r.room}`}>{r.room}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </header>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Switch>
                  <Route path="/room/:number" component={RoomSensors} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
