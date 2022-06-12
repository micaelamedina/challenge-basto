import axios from "axios";
import React, { useEffect, useState } from "react";

//Utils.
import s from "./LivestockList.module.css";

//Icons.
import { BiEdit } from "react-icons/bi/index";
import { RiDeleteBin6Line } from "react-icons/ri/index";

export default function LivestockList() {
  const [livestock, setLivestock] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/livestock")
      .then((result) => {
        setLivestock(result.data);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(livestock);
  return (
    <div>
      <h3>Listado de ganados</h3>
      <div className={s.containerAllLists}>
        <div className={s.containerList}>
          <ul>
            <li>ID Senasa</li>
            <li>Peso</li>
            <li>Nombre de Potrero</li>
            <li>Tipo de Animal</li>
            <li>Tipo de Dispositivo</li>
            <li>Número de dispositivo</li>
          </ul>
          <ul>
            {livestock === ""
              ? "Cargando listado de ganado..."
              : livestock === []
              ? "No hay ganado en la base de datos"
              : livestock.map((e) => (
                  <>
                    <li key={e._id}>{e.idSenasa}</li>
                    <li key={e._id}>{e.weight}</li>
                    <li key={e._id}>{e.namePaddock}</li>
                    <li key={e._id}>{e.animalType}</li>
                    <li key={e._id}>{e.deviceType}</li>
                    <li key={e._id}>{e.deviceNumber}</li>
                    <li>
                      <BiEdit size="28px" color="rgb(122, 181, 16)" />
                    </li>
                    <li>
                      <RiDeleteBin6Line size="28px" color="rgb(181, 4, 4)" />
                    </li>
                  </>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
