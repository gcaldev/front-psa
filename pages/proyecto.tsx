import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function NewProjectLayout() {
  const [form, setForm] = useState<any>({
    nombre: "",
    fechaInicio: "",
    fechaFin: "",
  });
  const router = useRouter();
  const [invalidForm, setInvalidForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const handleCreateProject = (e: any) => {
    e.preventDefault();
    if (form.titulo === "" || form.descripcion === "") {
      setInvalidForm(true);
      return;
    }

    setIsLoading(true);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = "backend-api.com/proyectos";

    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        const { id } = res;
        router.push(`/proyecto-creado/${id}`);
      })
      .catch((err) => router.push("/error"));
  };

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <form onSubmit={handleCreateProject}>
      <div>
        <h1 className="text-3xl font-bold mb-10 mt-5">Crear Proyecto</h1>
      </div>
      <div>
        <p className="font-semibold mb-1">Nombre proyecto</p>
        <input
          className="border w-full px-1 mb-5 rounded"
          type="text"
          placeholder="Nombre..."
          onChange={(e: any) => setForm({ ...form, titulo: e.target.value })}
        />
      </div>
      <div>
        <p className="font-semibold mb-1">Fecha de inicio</p>
        <input
          className="border w-full px-1 mb-5 rounded"
          type="text"
          placeholder="Fecha de inicio..."
          onChange={(e: any) => setForm({ ...form, titulo: e.target.value })}
        />
      </div>
      <div>
        <p className="font-semibold mb-1">Fecha de finalización</p>
        <input
          className="border w-full px-1 mb-5 rounded"
          type="text"
          placeholder="Fecha de finalización..."
          onChange={(e: any) => setForm({ ...form, titulo: e.target.value })}
        />
      </div>
      <div className="flex">
        <h1 className="font-semibold mr-1">Estado:</h1>
        <h1 className="mr-9">Sin comenzar</h1>
        <h1 className="font-semibold mr-1 mb-10">Líder:</h1>
        <h1>Sin Líder</h1>
      </div>
      <div className="flex">
        <Link
            className="bg-zinc-0	hover:bg-zinc-50 text-black font-bold py-1 px-4 ml-20"
            href={`/proyectos`}
        >Volver
        </Link>
        <button className="bg-sky-500 hover:bg-cyan-600 text-white font-bold py-1 px-4 rounded">Guardar</button>
      </div>
    </form>
  );
}
