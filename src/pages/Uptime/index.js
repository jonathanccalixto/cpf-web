import React, { Component } from "react";

import { format } from "date-fns";

import api from "../../services/api";

import "./styles.css";

const newDate = date => {
  if (!date) date = new Date();
  return format(date, "DD/MM/YYYY [às] HH:mm:SS");
};

export default class Uptime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startedAt: "",
      queries: "",
      blacklists: ""
    };

    this.refreshHandle = this.refreshHandle.bind(this);
  }

  async refreshHandle() {
    const { data } = await api.get("/status");
    const { startedAt, queries, blacklists } = data;

    this.setState(state => ({
      startedAt: newDate(startedAt),
      queries,
      blacklists
    }));
  }

  componentDidMount() {
    this.refreshHandle();
  }

  render() {
    const { startedAt, queries, blacklists } = this.state;

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
