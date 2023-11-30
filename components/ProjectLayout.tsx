import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Proyecto, Recurso } from "@/types/types";

const DEFAULT_SELECT_VALUE = "Elegir";

export default function ProjectLayout({ id = "" }: { id?: string }) {
  const router = useRouter();
  const createsProject = !id;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projectInfo, setProjectInfo] = useState<Proyecto>({
    nombre: "",
    fechaInicio: "",
    fechaFin: "",
    id: "",
    estado: DEFAULT_SELECT_VALUE,
    lider: DEFAULT_SELECT_VALUE,
  });
  const [resources, setResources] = useState<Recurso[]>([]);

  useEffect(() => {
    setIsLoading(true);

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `https://my-json-server.typicode.com/gcaldev/psa-mock/recursos`;

    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        setResources(res);
        setIsLoading(false);
      })
      .catch((err) => router.push("/error"));
  }, []);

  useEffect(() => {
    if (createsProject) {
      return;
    }
    setIsLoading(true);

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `https://my-json-server.typicode.com/gcaldev/psa-mock/proyectos/${router.query.id}`;

    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        setProjectInfo(res);
        setIsLoading(false);
      })
      .catch((err) => router.push("/error"));
  }, [router.isReady]);

  const handleProjectSubmit = () => {
    setIsLoading(true);

    const method = createsProject ? "POST" : "PUT";
    const body = createsProject
      ? { ...projectInfo, id: undefined }
      : projectInfo;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const url = `https://my-json-server.typicode.com/gcaldev/psa-mock/proyectos/${id}`;

    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        router.push("/exito");
      })
      .catch((err) => router.push("/error"));
  };

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <div className="flex-1 max-w-screen-md	justify-center mt-1">
      <div className="flex border">
        <img src="../info40.png" alt="info" className="mt-12 mb-12 ml-10" />
        {createsProject ? (
          <h1 className="text-3xl font-bold mb-10 mt-12 ml-5">
            Crear proyecto
          </h1>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-10 mt-12 ml-5">
              Información Del Proyecto -
            </h1>
            <h1 className="text-3xl font-bold mb-10 mt-12 ml-2">
              {projectInfo?.nombre}
            </h1>
          </>
        )}
      </div>
      <div className="grid grid-cols-6 gap-4 mt-8">
        <div className="col-span-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Nombre proyecto
          </label>
          <input
            type="text"
            value={projectInfo.nombre}
            className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
            onChange={(e) =>
              setProjectInfo((prev) => ({ ...prev, nombre: e.target.value }))
            }
          />
        </div>
        <div className="col-span-3">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Fecha de inicio
          </label>
          <input
            type="date"
            id="start"
            name="trip-start"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) =>
              setProjectInfo((prev) => ({
                ...prev,
                fechaInicio: e.target.value,
              }))
            }
            value={projectInfo.fechaInicio}
          />
        </div>
        <div className="col-span-3">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Fecha de finalización
          </label>
          <input
            type="date"
            id="start"
            name="trip-start"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) =>
              setProjectInfo((prev) => ({ ...prev, fechaFin: e.target.value }))
            }
            value={projectInfo.fechaFin}
          />
        </div>
        <div className="col-span-3">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Estado
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={projectInfo.estado}
            onChange={(e) =>
              setProjectInfo((prev) => ({ ...prev, estado: e.target.value }))
            }
          >
            <option value={DEFAULT_SELECT_VALUE}>Elegir</option>
            <option value="Sin Comenzar">Sin comenzar</option>
            <option value="En Progreso">En progreso</option>
            <option value="Finalizado">Terminado</option>
          </select>
        </div>
        <div className="col-span-3">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Asignado
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={projectInfo.lider}
            onChange={(e) =>
              setProjectInfo((prev) => ({ ...prev, asignado: e.target.value }))
            }
          >
            <option value={DEFAULT_SELECT_VALUE}>Elegir</option>
            {resources.map((resource) => {
              const fullName = `${resource.Nombre} ${resource.Apellido}`;
              return (
                <option id={resource.legajo} value={fullName}>
                  {fullName}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div
        className={`flex ${
          createsProject ? "justify-end" : "justify-between"
        } py-6 mt-8`}
      >
        {!createsProject && (
          <Link
            className="bg-zinc-200	hover:bg-zinc-100 text-black font-bold py-1 px-4 rounded "
            href={`/tablero/${encodeURIComponent(router.query.id as string)}`}
          >
            VER TABLERO
          </Link>
        )}
        <div className="flex">
          <Link
            className="bg-zinc-0	hover:bg-zinc-50 text-black font-bold py-1 px-4"
            href={`/proyectos`}
          >
            Volver
          </Link>
          <button
            className="bg-sky-500 hover:bg-cyan-600 text-white font-bold py-1 px-4 rounded"
            onClick={handleProjectSubmit}
          >
            {createsProject ? "Guardar" : "Actualizar"}
          </button>
        </div>
      </div>
    </div>
  );
}
