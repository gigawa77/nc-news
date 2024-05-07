import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <header className="header">
        <Link to="/">
          <img
            src="https://st2.depositphotos.com/6789684/12262/v/450/depositphotos_122620866-stock-illustration-illustration-of-flat-icon.jpg"
            className="logo"
            width={100}
          />
        </Link>
        <br />
        <button className="loginSignup">login/signup</button>
      </header>
    </div>
  );
}

export default Header;
