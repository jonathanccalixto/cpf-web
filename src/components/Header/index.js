import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

import logo from "../../assets/logo.svg";

export default function Header() {
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/">
          <img src={logo} alt="Consulta cpf" />
        </Link>
        <Link to="/"> Consultar CPF </Link>
        <Link to="/status"> Status do servidor </Link>
      </div>
    </header>
  );
}
