import React, { useEffect, useState } from "react";

//Utils.
import s from "./UpdateLivestock.module.css";

//New animal creation form validator function.
import { formUpdateValidate } from "../../controllers/updateLivestock";

//Data import of device types and animal types.
import data from "../../controllers/data.json";
import axios from "axios";

//Icons.
import { AiOutlineCloseCircle } from "react-icons/ai/index";

//Import alerts.
import Swal from "sweetalert2";

//Creation of a new animal.
export default function UpdateLivestock({
  modalUpdate,
  setModalUpdate,
  idDb,
  id,
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

  // Information required to the database and storage in local state.
  const [livestockUpdate, setLivestockUpdate] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:3001/livestock/${id}`)
      .then((result) => {
        setLivestockUpdate(result.data);
        setInput({
          idSenasa: result.data[0].idSenasa,
          weight: result.data[0].weight,
          namePaddock: result.data[0].namePaddock,
          animalType: result.data[0].animalType,
          deviceType: result.data[0].deviceType,
          deviceNumber: result.data[0].deviceNumber,
        });
      })
      .catch((error) => console.log(error));
  }, [id]);

  // State that stores the errors of the form, to validate it.
  const [errors, setErrors] = useState({});

  // State controlling functions
  const handleChangeForm = (event) => {
    event.preventDefault();
    if (event.target.value !== "Select") {
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });
      setErrors(
        formUpdateValidate(
          {
            ...input,
            [event.target.name]: event.target.value,
          },
          livestockUpdate
        )
      );
    }
  };
console.log(idDb)
  // Event that sends data from the form to the database to create a new livestock.
  const handleClickSubmit = (event) => {
    event.preventDefault();
    setErrors(
      formUpdateValidate(
        {
          ...input,
        },
        livestockUpdate
      )
    );
    if (!Object.keys(errors).length) {
      console.log(input)
      axios
        .patch(`http://localhost:3001/livestock/${idDb}`, input)
        .then((response) => response.data)
        .catch((error) => console.log(error));
      Swal.fire("El ganado ha sido modificado con éxito", "", "success");
      axios
        .get("http://localhost:3001/livestock")
        .then((result) => {
          setLivestock(result.data);
        })
        .catch((error) => console.log(error));
      setModalUpdate(!modalUpdate);
    } else {
      Swal.fire("Faltan datos en el formulario", "", "warning");
    }
  };
  const handleCloseModal = (event) => {
    event.preventDefault();
    setModalUpdate(!modalUpdate);
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
            <h2>Editar Ganado</h2>
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
            {errors.idSenasa && <p className={s.errorP}>{errors.idSenasa}</p>}
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
            {errors.animalType && (
              <p className={s.errorP}>{errors.animalType}</p>
            )}
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
            {errors.deviceType && (
              <p className={s.errorP}>{errors.deviceType}</p>
            )}
            <button className={s.buttonConfirm}>Confirmar cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
}
