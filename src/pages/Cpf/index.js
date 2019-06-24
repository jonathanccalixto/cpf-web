import React, { Component } from "react";

import InputMask from "react-input-mask";

import "./styles.css";

export default class Cpf extends Component {
  render() {
    return (
      <div id="main-container">
        <form action="">
          <InputMask
            mask="999.999.999-99"
            maskChar="_"
            type="text"
            placeholder="Informe um CPF para realizar a consulta"
          />
          <button id="status">Consultar</button>
          <button id="add">Adicionar na blacklist</button>
          <button id="remove">Remover da blacklist</button>
        </form>
      </div>
    );
  }
}
