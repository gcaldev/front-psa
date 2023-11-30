import React from "react";
import Link from "next/link";

export default function NotFoundLayout() {
  return (
    <div className="flex h-full flex-col justify-center items-center bg-white">
      <img src="error.jpg" alt="Error" />

      <h1 className="text-4xl mb-5 font-bold" style={{ marginBottom: "35px" }}>
        Hubo un error al realizar la operación
      </h1>
      <Link
        className="bg-sky-500	hover:bg-cyan-600 text-white font-bold py-1 px-4 rounded"
        href="/proyectos"
      >
        Volver a inicio
      </Link>
      <span className="text-7xl"></span>
    </div>
  );
}
