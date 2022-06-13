import React, { useState } from "react";

// Utils.
import s from "./SearchBar.module.css";

//Search bar by ID Senasa.
export default function SearchBar() {
  const [search, setSearch] = useState("");

  const handleChangeInput = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <form>
        <input
          value={search}
          type={"search"}
          placeholder="Ingrese ID a buscar..."
          onChange={(event) => handleChangeInput(event)}
        />
        <button>Buscar</button>
      </form>
    </div>
  );
}
