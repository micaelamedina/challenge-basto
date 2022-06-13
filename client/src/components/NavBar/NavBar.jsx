import React from "react";
import { NavLink } from "react-router-dom";

//Icons.
import { IoMdNotificationsOutline } from "react-icons/io/index";
import { FiLogOut } from "react-icons/fi/index";

//Utils.
import s from "./NavBar.module.css";
import logo from "../images/logo.png";

//Import alerts.
import Swal from "sweetalert2";

// Navigation bar component.
export default function NavBar() {
  // Controller function to indicate that the functionality is under development.
  const handleClickIcon = (event) => {
    event.preventDefault();
    Swal.fire("Funcionalidad en desarrollo", "", "warning");
  };
  return (
    <div className={s.container}>
      <nav>
        <NavLink to={"/"}>
          <div className={s.containerImg}>
            <img src={logo} alt="Logo" />
          </div>
        </NavLink>
        <div className={s.containerIcons}>
          <div className={s.icon} onClick={(event) => handleClickIcon(event)}>
            <IoMdNotificationsOutline size="30px" color="black" />
          </div>
          <div className={s.icon} onClick={(event) => handleClickIcon(event)}>
            <FiLogOut size="28px" color="black" />
          </div>
        </div>
      </nav>
    </div>
  );
}
