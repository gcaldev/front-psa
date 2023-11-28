import React from 'react';
import Link from "next/link";

export default function NotFoundLayout() {
  return (
    <div className="flex h-full flex-col justify-center items-center bg-white">
      <img
        src="ok.jpg"
        alt="Ok"
        style={{marginBottom: "25px"}}
      />

      <h1 className="text-4xl mb-5 font-bold" style={{marginBottom: "35px"}}>
        Tarea guardada exitosamente
      </h1>
      <Link
        className="bg-sky-500	hover:bg-cyan-600 text-white font-bold py-1 px-4 rounded"
        href="/home"
       >
        Ver tablero
       </Link>
       <Link
        className="bg-white-500 hover:bg-grey-600 text-sky-500 font-bold py-1 px-4 rounded"
        href="/home"
       >
        Volver a proyecto
       </Link>
      <span className="text-7xl"></span>
    </div>
  );
}