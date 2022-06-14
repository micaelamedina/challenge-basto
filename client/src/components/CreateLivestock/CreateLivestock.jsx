import React, { useEffect, useState } from "react";

//Utils.
import s from "./CreateLivestock.module.css";

//New animal creation form validator function.
import {
  formValidate,
} from "../../controllers/createLivestock";

//Data import of device types and animal types.
import data from "../../controllers/data.json";
import axios from "axios";

//Import alerts.
import Swal from "sweetalert2";

//Icons.
import { AiOutlineCloseCircle } from "react-icons/ai/index";

//Creation of a new animal.
export default function CreateLivestock({
  modalCreate,
  setModalCreate,
  setLivestock,
}) {
  // State that stores the form data.
  const [input, setInput] = useState({
    idSenasa: "",
    weight: "",
    namePaddock: "",
    animalType: "",
    deviceType: "",
    deviceNumber: "",
  });

  // State that stores the errors of the form, to validate it.
  const [errors, setErrors] = useState({
    idSenasa: "",
    weight: "",
    namePaddock: "",
    animalType: "",
    deviceType: "",
    deviceNumber: "",
  });

  // Information required to the database and storage in local state.
  const [livestockForm, setLivestockForm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/livestock")
      .then((result) => {
        setLivestockForm(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // State controlling functions.
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
          livestockForm
        )
      );
    }
  };

  // Event that sends data from the form to the database to create a new livestockForm.
  const handleClickSubmit = (event) => {
    event.preventDefault();
    setErrors(
      formValidate(
        {
          ...input,
        },
        livestockForm
      )
    );
    if (!Object.keys(errors).length) {
      axios
        .post("http://localhost:3001/livestock", input)
        .then((response) => response.data)
        .catch((error) => console.log(error));
      setInput({
        idSenasa: "",
        weight: 0,
        namePaddock: "",
        animalType: "",
        deviceType: "",
        deviceNumber: "",
      });

      Swal.fire("El ganado ha sido creado con éxito", "", "success");
      axios
        .get("http://localhost:3001/livestock")
        .then((result) => {
          setLivestock(result.data);
        })
        .catch((error) => console.log(error));
      setModalCreate(!modalCreate);
    } else {
      Swal.fire({
        title: "Revisar datos del formulario",
        text: `Faltan datos o bien son erróneos.`,
        icon: "warning",
      });
    }
  };

  // Reset form.
  const handleClickReset = (event) => {
    event.preventDefault();
    setInput({
      idSenasa: "",
      weight: 0,
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

  //Close the form.
  const handleCloseModal = (event) => {
    event.preventDefault();
    setModalCreate(!modalCreate);
  };

  return (
    <div className={s.container}>
      <span
        className={s.modalCloseButton}
        onClick={(event) => handleCloseModal(event)}
      ></span>
      <div className={s.containerForm}>
        <form onSubmit={(event) => handleClickSubmit(event)}>
        <div className={s.containerTitle}>
          <h2>Nuevo Ganado</h2>
          <div
              className={s.containerButton}
              onClick={(event) => handleCloseModal(event)}
            >
              <AiOutlineCloseCircle size="30px" color="rgb(122, 181, 16)" />
            </div>
            </div>
          <div className={s.containerInput}>
            <label>ID Senasa</label>
            <input
              type="text"
              placeholder="ID Senasa"
              name={"idSenasa"}
              value={input.idSenasa}
              onChange={(event) => handleChangeForm(event)}
              maxLength={"16"}
            />
            {errors.idSenasa && (
              <p className={s.errorP}>{errors.idSenasa}</p>
            )}
            <label>Peso</label>
            <input
              type="number"
              placeholder="Peso"
              name={"weight"}
              value={input.weight}
              onChange={(event) => handleChangeForm(event)}
            />
            {errors.weight && <p className={s.errorP}>{errors.weight}</p>}
            <label>Nombre de Potrero</label>
            <input
              type="text"
              placeholder="ID Senasa"
              name={"namePaddock"}
              value={input.namePaddock}
              onChange={(event) => handleChangeForm(event)}
              maxLength={"200"}
            />
            {errors.namePaddock && (
              <p className={s.errorP}>{errors.namePaddock}</p>
            )}
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
            {errors.animalType && (
              <p className={s.errorP}>{errors.animalType}</p>
            )}
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
            {errors.deviceType && (
              <p className={s.errorP}>{errors.deviceType}</p>
            )}
            <label>Número de Dispositivo</label>
            <input
              type="text"
              placeholder="Número de Dispositivo"
              name="deviceNumber"
              value={input.deviceNumber}
              onChange={(event) => handleChangeForm(event)}
              maxLength={"8"}
            />
            {errors.deviceNumber && (
              <p className={s.errorP}>{errors.deviceNumber}</p>
            )}
            <button className={s.buttonCreate}>Crear Ganado</button>
            <button className={s.buttonReset} onClick={(event) => handleClickReset(event)}>
              Limpiar formulario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
