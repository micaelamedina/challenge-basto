import React, { useEffect, useState } from "react";

//Utils.
import s from "./CreateLivestock.module.css";

//New animal creation form validator function.
import {
  formValidate,
  selectValidate,
} from "../../controllers/createLivestock";

//Data import of device types and animal types.
import data from "../../controllers/data.json";
import axios from "axios";

//Creation of a new animal.
export default function CreateLivestock() {
  //State that stores the form data.
  const [input, setInput] = useState({
    idSenasa: "",
    weight: "",
    namePaddock: "",
    animalType: "",
    deviceType: "",
    deviceNumber: "",
  });

  //State that stores the errors of the form, to validate it.
  const [errors, setErrors] = useState({
    idSenasa: "",
    weight: "",
    namePaddock: "",
    animalType: "",
    deviceType: "",
    deviceNumber: "",
  });

  //State controlling functions
  const handleChangeForm = (event) => {
    event.preventDefault();
    if (event.target.value !== "Select") {
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });
      setErrors(
        formValidate({
          ...input,
          [event.target.name]: event.target.value,
        })
      );
    }
  };

  //Event that sends data from the form to the database to create a new livestock.
  const handleClickSubmit = (event) => {
    event.preventDefault();
    setErrors(
      selectValidate({
        ...input,
      })
    );
    if (!Object.keys(errors).length) {
      axios
        .post("http://localhost:3001/livestock", input)
        .then((response) => response.data)
        .catch((error) => console.log(error));
      setInput({
        idSenasa: "",
        weight: "",
        namePaddock: "",
        animalType: "",
        deviceType: "",
        deviceNumber: "",
      });
      alert("El ganado ha sido creado con éxito!");
    } else {
      alert("Faltan datos en el formulario.");
    }
  };

  const handleClickReset = (event) => {
    event.preventDefault();
    setInput({
      idSenasa: "",
      weight: "",
      namePaddock: "",
      animalType: "",
      deviceType: "",
      deviceNumber: "",
    });
    setErrors({
      idSenasa: "",
      weight: "",
      namePaddock: "",
      animalType: "",
      deviceType: "",
      deviceNumber: "",
    });
  };
  return (
    <div>
      <form onSubmit={(event) => handleClickSubmit(event)}>
        <label>ID Senasa</label>
        <input
          type="text"
          placeholder="ID Senasa"
          name={"idSenasa"}
          value={input.idSenasa}
          onChange={(event) => handleChangeForm(event)}
          maxLength={"16"}
        />
        <label>Peso</label>
        <input
          type="number"
          placeholder="Peso"
          name={"weight"}
          value={input.weight}
          onChange={(event) => handleChangeForm(event)}
        />
        <label>Nombre de Potrero</label>
        <input
          type="text"
          placeholder="ID Senasa"
          name={"namePaddock"}
          value={input.namePaddock}
          onChange={(event) => handleChangeForm(event)}
          maxLength={"200"}
        />
        <label>Tipo de Animal</label>
        <select
          name={"animalType"}
          onChange={(event) => handleChangeForm(event)}
        >
          <option value="Select">Seleccionar</option>
          {data.animalType.length
            ? data.animalType.map((e) => (
                <option value={e} key={e}>
                  {e}
                </option>
              ))
            : "No hay tipos de animales pre-cargados"}
        </select>
        <label>Tipo de Dispositivo</label>
        <select
          name={"deviceType"}
          onChange={(event) => handleChangeForm(event)}
        >
          <option value="Select">Seleccionar</option>
          {data.deviceType.length
            ? data.deviceType.map((e) => (
                <option value={e} key={e}>
                  {e}
                </option>
              ))
            : "No hay tipos de dispositivos pre-cargados"}
        </select>
        <label>Número de Dispositivo</label>
        <input
          type="text"
          placeholder="Número de Dispositivo"
          name="deviceNumber"
          value={input.deviceNumber}
          onChange={(event) => handleChangeForm(event)}
          maxLength={"8"}
        />
        <button>Crear Ganado</button>
        <button onClick={(event) => handleClickReset(event)}>
          Limpiar formulario
        </button>
      </form>
    </div>
  );
}
