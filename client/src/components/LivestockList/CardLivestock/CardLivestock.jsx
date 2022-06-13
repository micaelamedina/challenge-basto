import React from "react";

//Utils.
import s from "./CardLivestock.module.css";

//Icons.
import { BiEdit } from "react-icons/bi/index";
import { RiDeleteBin6Line } from "react-icons/ri/index";
import { NavLink } from "react-router-dom";

//Controller delete.
import { handleClickDelete } from "../../../controllers/deleteLivestock";

//Import alerts.
import Swal from "sweetalert2";
import axios from "axios";

// Cards for the data list.
export default function CardLivestock({
  _id,
  idSenasa,
  weight,
  namePaddock,
  animalType,
  deviceType,
  deviceNumber,
  actions,
  type,
  setModalUpdate,
  modalUpdate,
  setLivestock,
}) {

  // Controller function to open modification form.
  const handleClickEdit = (event) => {
    event.preventDefault();
    setModalUpdate(!modalUpdate);
  };

  // Handler function to remove an item.
  const handleClickRemove = (event, _id, idSenasa) => {
    event.preventDefault();
    Swal.fire({
      title: "¿Desea eliminar este ítem?",
      text: "Una vez confirmado, no se podrán recuperar los datos",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleClickDelete(_id, idSenasa).then((response) => {
          if (response?.data.message === "Livestock removed successfully") {
            axios
              .get("http://localhost:3001/livestock")
              .then((result) => {
                setLivestock(result.data);
              })
              .catch((error) => console.log(error));
          }
        });
      }
    });
  };
  return (
    <div className={type === "title" ? s.containerTitle : s.containerCard}>
      <p className={s.idSenasa}>{idSenasa}</p>
      {type === "title" ? <p>{weight}</p> : <p>{weight} Kg.</p>}
      <p>{namePaddock}</p>
      <p>{animalType}</p>
      <p>{deviceType}</p>
      <p>{deviceNumber}</p>
      {type !== "title" ? (
        <div className={s.containerIcons}>
          <div onClick={(event) => handleClickEdit(event)}>
            <BiEdit size="28px" color="rgb(122, 181, 16)" />
          </div>
          <div
            value={_id}
            onClick={(event) => handleClickRemove(event, _id, idSenasa)}
          >
            <RiDeleteBin6Line size="28px" color="rgb(181, 4, 4)" />
          </div>
        </div>
      ) : (
        <p>{actions}</p>
      )}
    </div>
  );
}
