import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { cartList } = useSelector((state) => state.cart);
  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  // fixed Header scroll logic
  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY >= 100) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", scrollHandler);

    // cleanup (VERY IMPORTANT)
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <Navbar
      fixed="top"
      expand="md"
      className={isFixed ? "navbar fixed" : "navbar"}
    >
      <Container className="navbar-container">
        <Navbar.Brand as={Link} to="/">
          <ion-icon name="bag"></ion-icon>
          <h1 className="logo">Multimart</h1>
        </Navbar.Brand>

        {/* Media cart and toggle */}
        <div className="d-flex">
          <div className="media-cart">
            <Link
              aria-label="Go to Cart Page"
              to="/cart"
              className="cart"
              data-num={cartList.length}
            >
              🛒
            </Link>
          </div>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpand(expand ? false : "expanded")}
          />
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="navbar-link" to="/" onClick={() => setExpand(false)}>
              Home
            </Link>
            <Link className="navbar-link" to="/shop" onClick={() => setExpand(false)}>
              Shop
            </Link>
            <Link className="navbar-link" to="/cart" onClick={() => setExpand(false)}>
              Cart
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
