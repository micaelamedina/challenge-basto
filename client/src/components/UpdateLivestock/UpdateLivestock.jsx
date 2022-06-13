import React, { useEffect, useState } from "react";

//Utils.
import s from "./UpdateLivestock.module.css";

//New animal creation form validator function.
import {
  formValidate,
  selectValidate,
} from "../../controllers/createLivestock";

//Data import of device types and animal types.
import data from "../../controllers/data.json";
import axios from "axios";
import { useParams } from "react-router-dom";

//Creation of a new animal.
export default function UpdateLivestock({ modalUpdate, setModalUpdate }) {
  const { id } = useParams();

  // State that stores the form data.
  const [input, setInput] = useState({
    idSenasa: "",
    weight: "",
    namePaddock: "",
    animalType: "",
    deviceType: "",
    deviceNumber: "",
  });

  // Information required to the database and storage in local state.
  const [livestock, setLivestock] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:3001/livestock/${id}`)
      .then((result) => {
        setLivestock(result.data);
        setInput({
            idSenasa: result.data.idSenasa,
            weight: result.data.weight,
            namePaddock: result.data.namePaddock,
            animalType: result.data.animalType,
            deviceType: result.data.deviceType,
            deviceNumber: result.data.deviceNumber,
          })
      })
      .catch((error) => console.log(error));
  }, [id]);

  // State that stores the errors of the form, to validate it.
  const [errors, setErrors] = useState({
  });

  // State controlling functions
  const handleChangeForm = (event) => {
    event.preventDefault();
    if (event.target.value !== "Select") {
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });
      setErrors(
        formValidate(
          {
            ...input,
            [event.target.name]: event.target.value,
          },
          livestock
        )
      );
    }
  };

  // Event that sends data from the form to the database to create a new livestock.
  const handleClickSubmit = (event) => {
    event.preventDefault();
    setErrors(
      selectValidate(
        {
          ...input,
        },
        livestock
      )
    );
    if (!Object.keys(errors).length) {
      axios
        .patch(`http://localhost:3001/livestock/${id}`, input)
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
      alert("El elemento ha sido modificado con éxito");
    } else {
      alert("Faltan datos en el formulario.");
    }
  };
  const handleCloseModal = (event) => {
    event.preventDefault();
    setModalUpdate(!modalUpdate);
  };
  return (
    <div>
       <span
        className={s.modalCloseButton}
        onClick={(event) => handleCloseModal(event)}
      ></span>
      <div>
      <button onClick={(event) => handleCloseModal(event)}>X</button>
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
          value={input.animalType}
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
          value={input.deviceType}
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
        <button>Confirmar cambios</button>
      </form>
    </div>
    </div>
  );
}
