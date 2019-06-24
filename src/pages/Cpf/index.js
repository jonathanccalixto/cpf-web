import React, { Component } from "react";

import InputMask from "react-input-mask";

import api from "../../service/api";
import "./styles.css";

export default class Cpf extends Component {
  state = {
    cpf: "",
    status: ""
  };

  handleInputChange = event => {
    event.preventDefault();
    const cpf = event.target.value;

    this.setState(state => ({ cpf }));
  };

  handleStatus = async event => {
    event.preventDefault();
    const { cpf } = this.state;

    const response = await api.get("/cpf/status", { cpf });

    console.log(response.data);
  };

  handleAdd = event => {
    event.preventDefault();
  };

  handleRemove = event => {
    event.preventDefault();
  };

  render() {
    const { cpf, status } = this.state;

    return (
      <div id="main-container">
        <form
          onSubmit={event => {
            event.preventDefault();
          }}
        >
          <InputMask
            mask="999.999.999-99"
            maskChar="_"
            type="text"
            placeholder="Informe um CPF para realizar a consulta"
            onChange={this.handleInputChange}
            value={cpf}
          />
          <button id="status" onClick={this.handleStatus}>
            Consultar
          </button>
          <button
            id="add"
            onClick={this.handleAdd}
            className={status != "FREE" ? "hidden" : ""}
          >
            Adicionar na blacklist
          </button>
          <button
            id="remove"
            onClick={this.handleRemove}
            className={status != "BLOCK" ? "hidden" : ""}
          >
            Remover da blacklist
          </button>
        </form>
      </div>
    );
  }
}
