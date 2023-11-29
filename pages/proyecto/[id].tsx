import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ProjectInfo {
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  id: string;
  estado: string;
  lider: string;
}

export default function ProjectLayout() {
  const router = useRouter();
  const [projectId, setProjectId] = useState<string>("");
  const [invalidForm, setInvalidForm] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
    nombre: "",
    fechaInicio: "",
    fechaFin: "",
    id: "",
    estado: "",
    lider: "",
  });

  useEffect(() => {
    setProjectId(router.query.id as string);
    setIsLoading(true);

    setProjectInfo({
      id: "6",
      lider: "Laura",
      estado: "finalizado",
      fechaInicio: "2023-09-20",
      fechaFin: "2023-10-25",
      nombre: "Proyecto F",
    });
    /*
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `backend-api.com/proyectos/${router.query.id}`;

    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        setProjectInfo(res);
      })
      .catch((err) => router.push("/error"));*/
  }, [router.isReady]);

  const handleUpdateProject = (e: any) => {
    //e.preventDefault();

    setIsLoading(true);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectInfo),
    };
    const url = "backend-api.com/proyectos";

    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        const { id } = res;
        router.push(`/proyecto-actualizado/${id}`);
      })
      .catch((err) => router.push("/error"));
  };

  return (
    <div className="items-start">
      <div>
        <h1 className="text-3xl font-bold mb-10 mt-5">Información Del Proyecto</h1>
      </div>
      <div>
        <p className="font-semibold mb-1">Nombre proyecto</p>
        <input
          className="border w-full px-1 mb-5 rounded"
          type="text"
          placeholder="Nombre..."
          onChange={(e: any) =>
            setProjectInfo({ ...projectInfo, nombre: e.target.value })
          }
          value={projectInfo?.nombre}
        />
      </div>
      <div>
        <p className="font-semibold mb-1">Fecha de inicio</p>
        <input
          className="border w-full px-1 mb-5 rounded"
          type="text"
          placeholder="Fecha de inicio..."
          disabled
          value={projectInfo?.fechaInicio}
        />
      </div>
      <div>
        <p className="font-semibold mb-1">Fecha de finalización</p>
        <input
          className="border w-full px-1 mb-5 rounded"
          type="text"
          placeholder="Fecha de finalización..."
          onChange={(e: any) =>
            setProjectInfo({ ...projectInfo, fechaFin: e.target.value })
          }
          value={projectInfo?.fechaFin}
        />
      </div>
      <div className="flex mb-10">
        <h1 className="font-semibold mr-1">Estado:</h1>
        <select
          className="border rounded"
          onChange={(e) =>
            setProjectInfo({ ...projectInfo, estado: e.target.value })
          }
        >
          <option value="Sin comenzar">Sin comenzar</option>
          <option value="En progreso">En progreso</option>
          <option value="Finalizado">Finalizado</option>
        </select>

        <h1 className="font-semibold mr-1 ml-20">Líder:</h1>
        <select
          className="border rounded"
          onChange={(e) =>
            setProjectInfo({ ...projectInfo, lider: e.target.value })
          }
        >
          <option value="Ricardo">Ricardo</option>
          <option value="Juan">Juan</option>
          <option value="Francisco">Francisco</option>
        </select>
      </div>
      <Link
        className="bg-zinc-200	hover:bg-zinc-100 text-black font-bold py-1 px-4 rounded mr-20"
        href={`/tablero/${encodeURIComponent(projectId)}`}
      >
        Ver tablero
      </Link>
      <Link
        className="bg-zinc-0	hover:bg-zinc-50 text-black font-bold py-1 px-4"
        href={`/proyectos`}
      >
        Volver
      </Link>
      <button className="bg-sky-500 hover:bg-cyan-600 text-white font-bold py-1 px-4 rounded" onClick={handleUpdateProject}>Actualizar</button>
    </div>
  );
}
