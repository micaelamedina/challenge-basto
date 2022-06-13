import axios from "axios";
import React, { useEffect, useState } from "react";

//Components.
import LivestockList from "../LivestockList/LivestockList";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import CreateLivestock from "../CreateLivestock/CreateLivestock";

//Utils.
import s from "./Home.module.css";
import UpdateLivestock from "../UpdateLivestock/UpdateLivestock";

//Principal page component.
export default function Home() {
  /* ----- LOCAL STATES ----- */
  // State of the search input.
  const [search, setSearch] = useState("");

  // Database Information Container States.
  const [livestock, setLivestock] = useState("");
  const [livestockFilter, setLivestockFilter] = useState();

  // States of creation and modification forms.
  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  /* ----- END LOCAL STATES ----- */

  // Input controller.
  const handleChangeInput = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const handleClickCreate = (event) => {
    event.preventDefault();
    setModalCreate(!modalCreate);
  };

  // Information required to the database.
  useEffect(() => {
    axios
      .get("http://localhost:3001/livestock")
      .then((result) => {
        setLivestock(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Search Controllers.
  const handleClickSearch = (event) => {
    event.preventDefault();
    axios
      .get(`http://localhost:3001/livestock/${search}`)
      .then((result) => {
        setLivestockFilter(result.data);
      })
      .catch((error) => console.log(error));
  };

  // Reset filters by search.
  const handleClickReset = (event) => {
    event.preventDefault();
    setLivestockFilter();
    axios
      .get("http://localhost:3001/livestock")
      .then((result) => {
        setLivestock(result.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <NavBar />
      <h2>Búsqueda por ID de Senasa</h2>
      <form>
        <input
          value={search}
          type={"search"}
          placeholder="Ingrese ID a buscar..."
          onChange={(event) => handleChangeInput(event)}
        />
        <button onClick={(event) => handleClickSearch(event)}>Buscar</button>
      </form>

      <div>
        <button onClick={(event) => handleClickCreate(event)}>
          Crear nuevo ganado
        </button>
        {modalCreate && (
          <CreateLivestock
            modalCreate={modalCreate}
            setModalCreate={setModalCreate}
            setLivestock={setLivestock}
          />
        )}
      </div>
      {livestockFilter?.length ? (
        <div>
          <h2>Resultado de búsqueda</h2>
          <button onClick={(event) => handleClickReset(event)}>
            Restablecer filtros
          </button>
        </div>
      ) : (
        <h2>Listado completo de ganado</h2>
      )}

      <LivestockList
        livestockToRender={
          livestockFilter?.length ? livestockFilter : livestock
        }
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        setLivestock={setLivestock}
      />
      {modalUpdate && (
        <UpdateLivestock
          modalUpdate={modalUpdate}
          setModalUpdate={setModalUpdate}
        />
      )}
    </div>
  );
}
