import React, { Component } from "react";

import { format } from "date-fns";

import api from "../../service/api";
import "./styles.css";

const random = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const newDate = () => format(new Date(), "DD/MM/YYYY [às] HH:mm:SS");

export default class Uptime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startedAt: newDate(),
      queries: random(1, 50),
      blacklists: random(1, 50)
    };

    this.refreshHandle = this.refreshHandle.bind(this);
  }

  refreshHandle() {
    const value = random(0, 30);
    const count = random(1, 50);

    if (value > 20) {
      this.setState(state => ({ startedAt: newDate(), ...state }));
    } else if (value > 10) {
      this.setState(state => ({ queries: count, ...state }));
    } else {
      this.setState(state => ({ blacklists: count, ...state }));
    }
  }

  render() {
    console.log(this.state);
    const { startedAt, queries, blacklists } = this.state;
    console.log({ startedAt, queries, blacklists });
    return (
      <div id="main-container">
        <div id="container">
          <span id="title" className="wrapper">
            <span> Estatísticas do servidor </span>
            <button className="refresh" onClick={this.refreshHandle}>
              Atualizar
            </button>
          </span>
          <span className="wrapper">
            <span className="description">Iniciado em:</span>
            <span id="startedAt" className="value">
              {startedAt}
            </span>
          </span>
          <span className="wrapper">
            <span className="description">Consultas realizadas:</span>
            <span id="queries" className="value">
              {queries}
            </span>
          </span>
          <span className="wrapper">
            <span className="description">CPFs na blacklist:</span>
            <span id="blacklists" className="value">
              {blacklists}
            </span>
          </span>
        </div>
      </div>
    );
  }
}
