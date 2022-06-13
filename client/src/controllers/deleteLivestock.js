/* Handler functions for delete items. */

import axios from "axios";

//Import alerts.
import Swal from "sweetalert2";

export const handleClickDelete = async (idDb, idSenasa) => {
  const dataDelete = await axios.delete(`http://localhost:3001/livestock/${idDb}`);
  if(dataDelete.data.message === "Livestock removed successfully") {
    Swal.fire(
      'Confirmado',
      `El ID ${idSenasa} fue eliminado`,
      'success'
    )
  }
  return dataDelete;
};