/* Handler functions for UpdateLivestock component */

//New animal creation form validator function.
export const formUpdateValidate = (form, data) => {
    let errors = {};
    if (form.idSenasa.length !== 16) {
      errors.idSenasa =
        "El ID de Senasa debe contener 16 caracteres alfanuméricos.";
    }
    if (form.idSenasa.length === 0) {
      errors.idSenasa =
        "Debe ingresar el ID de Senasa. (16 caracteres alfanuméricos).";
    }
    if (form.weight === 0 || form.weight === "") {
      errors.weight = "Debe ingresar un peso válido.";
    }
    if (form.namePaddock.length === 0) {
      errors.namePaddock =
        "Debe ingresar el nombre de potrero. (Hasta 200 caracteres)";
    }
    if (form.namePaddock.length > 200) {
      errors.namePaddock =
        "El nombre del potrero no puede superar los 200 caracteres.";
    }
    if (form.idSenasa.length !== 16) {
      errors.idSenasa =
        "El ID de Senasa debe contener 16 caracteres alfanuméricos.";
    }
    if (form.deviceNumber.length === 0) {
      errors.deviceNumber =
        "Debe ingresar el número de dispositivo. (Hasta 8 caracteres)";
    }
    if (form.deviceNumber.length === 0) {
      errors.deviceNumber =
        "Debe ingresar el número de dispositivo. (8 caracteres alfanuméricos).";
    }
    if (form.animalType === "") {
      errors.animalType = "Debe seleccionar tipo de animal";
    }
    if (form.deviceType === "") {
      errors.deviceType = "Debe seleccionar tipo de dispositivo";
    }
    return errors;
  };