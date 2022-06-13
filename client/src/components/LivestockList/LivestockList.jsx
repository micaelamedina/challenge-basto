import axios from "axios";
import React, { useEffect, useState } from "react";

//Utils.
import s from "./LivestockList.module.css";

import CardLivestock from "./CardLivestock/CardLivestock";

// Data list.
export default function LivestockList({
  modalUpdate,
  setModalUpdate,
  livestockToRender,
  setLivestock,
}) {
  return (
    <div>
      <CardLivestock
        idSenasa={<b>ID Senasa</b>}
        weight={<b>Peso</b>}
        namePaddock={<b>Nombre de potrero</b>}
        animalType={<b>Tipo de animal</b>}
        deviceType={<b>Tipo de dispositivo</b>}
        deviceNumber={<b>N° de dispositivo</b>}
        actions={<b>Acciones</b>}
        type={"title"}
      />
      {livestockToRender === ""
        ? "Cargando listado de ganado..."
        : livestockToRender === []
        ? "No hay ganado en la base de datos"
        : livestockToRender.map((e) => (
            <CardLivestock
              idSenasa={e.idSenasa}
              weight={e.weight}
              namePaddock={e.namePaddock}
              animalType={e.animalType}
              deviceType={e.deviceType}
              deviceNumber={e.deviceNumber}
              actions={"icons"}
              type={"card"}
              _id={e._id}
              key={e._id}
              modalUpdate={modalUpdate}
              setModalUpdate={setModalUpdate}
              setLivestock={setLivestock}
            />
          ))}
    </div>
  );
}
