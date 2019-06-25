import React, { Component } from "react";

import InputMask from "react-input-mask";

import Message from "../../components/Message";

import api from "../../services/api";
import "./styles.css";

export default class Cpf extends Component {
  state = {
    cpf: "",
    status: "",
    error: "",
    success: ""
  };

  handleInputChange = event => {
    event.preventDefault();
    const cpf = event.target.value;

    if (this.state.cpf === cpf) return;

    this.setState(state => ({ cpf, status: "", error: "", success: "" }));
  };

  handleStatus = async event => {
    event.preventDefault();

    const { cpf } = this.state;
    let success = "";
    let error = "";
    let status = "";

    try {
      const { data } = await api.get("/cpf/status", { params: { cpf } });
      status = data;

      if (status === "FREE") {
        success = "CPF não está na blacklist!";
      } else if (status === "BLOCK") {
        error = "CPF está na blacklist!";
      }
    } catch ({ response }) {
      error = response.data;
    }

    this.setState(state => ({ status, error, success }));
  };

  handleAdd = async event => {
    event.preventDefault();

    const { cpf } = this.state;
    let { success, error, status } = this.state;

    try {
      const response = await api.post("/cpf/add", { cpf });

      if (response.status === 201) {
        status = "BLOCK";
        error = "CPF está na blacklist!";
        success = "";
      }
    } catch ({ response }) {
      error = response.data;
      success = "";
    }

    this.setState(state => ({ status, error, success }));
  };

  handleRemove = async event => {
    event.preventDefault();

    const { cpf } = this.state;
    let { success, error, status } = this.state;

    try {
      const response = await api.delete("/cpf/remove", { params: { cpf } });

      if (response.status === 200) {
        status = "FREE";
        error = "";
        success = "CPF não está na blacklist!";
      }
    } catch ({ response }) {
      error = response.data;
      success = "";
    }

    this.setState(state => ({ status, error, success }));
  };

  render() {
    const { cpf, status, error, success } = this.state;

    return (
      <div id="main-container">
        <form
          onSubmit={event => {
            event.preventDefault();
          }}
        >
          {success ? <Message type="success" text={success} /> : ""}
          {!success && error ? <Message type="error" text={error} /> : ""}

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
            className={status !== "FREE" ? "hidden" : ""}
          >
            Adicionar na blacklist
          </button>

          <button
            id="remove"
            onClick={this.handleRemove}
            className={status !== "BLOCK" ? "hidden" : ""}
          >
            Remover da blacklist
          </button>
        </form>
      </div>
    );
  }
}
