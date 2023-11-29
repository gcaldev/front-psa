import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
        <p>Nombre proyecto</p>
        <input
          className="border"
          type="text"
          placeholder="Nombre..."
          onChange={(e: any) => setForm({ ...form, titulo: e.target.value })}
        />
      </div>
      <div>
        <p>Fecha de inicio</p>
        <input
          className="border"
          type="text"
          placeholder="Fecha de inicio..."
          onChange={(e: any) => setForm({ ...form, titulo: e.target.value })}
        />
      </div>
      <div>
        <p>Fecha de finalización</p>
        <input
          className="border"
          type="text"
          placeholder="Fecha de finalización..."
          onChange={(e: any) => setForm({ ...form, titulo: e.target.value })}
        />
      </div>

      <button>Guardar</button>
    </form>
  );
}
