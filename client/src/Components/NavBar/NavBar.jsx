import { logout}       from "../../Redux/actions";
import {loginSuccess}  from "../../Redux/actions";
import Modal           from "../Modal/Modal";
import {NavLink}       from "react-router-dom";
import React           from "react";
import Styles          from "./Navbar.module.css";
import { useDispatch } from "react-redux";
import { useEffect }   from "react";
import { useRef }      from "react";
import { useState }    from "react";
import { useSelector } from "react-redux";

export const NavBar = () => {
  const hamburguerRef = useRef(null);
  const navMenuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    const isLoggedInInLocalStorage = localStorage.getItem("isLoggedIn");
    if (isLoggedInInLocalStorage === "true") {
      const userFromLocalStorage = localStorage.getItem("user");
      if (userFromLocalStorage) {
        try {
          const parsedUser = JSON.parse(userFromLocalStorage);
          dispatch(loginSuccess(parsedUser));
        } catch (e) {
          console.error("Error parsing user from local storage:", e);
        }
      }
    }
  }, []);
  

  const handleLogout = () => {
    dispatch(logout());
    return window.location.replace("/");
  };

  const handleLoginButtonClick = () => {
    console.log("User clicked login button.");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRegisterButtonClick = () => {
    console.log("User clicked register button.");
    setShowModal(false);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 975);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleHamburguerClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
      if (hamburguerRef.current && navMenuRef.current) {
        hamburguerRef.current.classList.remove("active");
        navMenuRef.current.classList.remove("active");
      }
    } else {
      setMenuOpen(true);
      if (hamburguerRef.current && navMenuRef.current) {
        hamburguerRef.current.classList.add("active");
        navMenuRef.current.classList.add("active");
      }
    }
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    navMenuRef.current.classList.toggle("active");
  }

  return (
    <nav className={`${Styles["nav-container"]} ${menuOpen ? Styles["active"] : ""}`}>
      <img
        src="https://res.cloudinary.com/dsjsbp6qy/image/upload/v1679065705/Dshop/Dise%C3%B1o_sin_t%C3%ADtulo__19_-removebg-preview-removebg-preview_gvpsgd.png"
        alt="logo"
        width={200}
        height={60}
      />
      <div
        className={`${Styles["nav-menu"]} ${menuOpen ? Styles["active"] : ""}`}
        ref={navMenuRef} > 
        <NavLink
          className={Styles["nav-link"]}
          exact
          to="/"
          activeClassName="active" >
          Inicio
        </NavLink>
        <NavLink
          className={Styles["nav-link"]}
          exact
          to="/cursos"
          activeClassName="active" >
          Mis cursos
        </NavLink>


        {isLoggedIn ? (
        <li className={Styles["container-link-ico"]}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/5509/5509651.png"
            alt="cerrar sesion"
            width={40}
            height={40}
            onClick={handleLogout}
          />
          <span>Cerrar sesión</span>
        </li>
        ) 
        : 
        (
          <span onClick={() => setShowModal(true)} className={Styles["nav-link"]}>Iniciar sesión</span>
        )}
        
        {showModal && (
          <Modal onClose={handleCloseModal} onRegister={handleRegisterButtonClick} onLogin={handleLoginButtonClick}>
          </Modal>
        )}




        {isMobile && (
          <button
            className={Styles["button-salirMenu"]}
            onClick={handleHamburguerClick}
          >
            Salir del Menú
          </button>
        )}
      </div>

      {isMobile && (
        <button
          // className={Styles["mobile-menu-button"]}
          className={`${Styles["mobile-menu-button"]} ${menuOpen ? Styles["active"] : ""}`}
          onClick={handleMenuClick} >
          Menú
        </button>
      )}
    </nav>
  );
};

export default NavBar;