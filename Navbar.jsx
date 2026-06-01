import "../styles/Navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <header className="navbar">
      <img
        src={logo}
        alt="FLOW"
        className="navbar-logo"
      />

      <nav className="navbar-menu">
        <a href="#">Início</a>
        <a href="#">Camisas</a>
        <a href="#">Acessórios</a>
        <a href="#">Contato</a>
      </nav>
    </header>
  );
}

export default Navbar;