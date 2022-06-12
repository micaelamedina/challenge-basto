import React from "react";

//Components.
import LivestockList from "../LivestockList/LivestockList";
import NavBar from "../NavBar/NavBar";

//Utils.
import s from "./Home.module.css";

export default function Home() {
  return (
    <div>
      <NavBar />

      <h2>Listado de ganados</h2>

      <div>
        <button>Crear nuevo ganado</button>
      </div>
      <LivestockList />
    </div>
  );
}
