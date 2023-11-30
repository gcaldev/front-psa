import { Recurso, Tarea } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DEFAULT_SELECT_VALUE = "Elegir";

export default function TaskLayout({
  id = "",
  project_id,
}: {
  id?: string;
  project_id: string;
}) {
  const createsTask = !id;
  const router = useRouter();
  const [taskInfo, setTaskInfo] = useState({
    project_id,
    fechaInicio: "",
    fechaFin: "",
    estado: DEFAULT_SELECT_VALUE,
    prioridad: DEFAULT_SELECT_VALUE,
    asignado: DEFAULT_SELECT_VALUE,
    titulo: "",
    id: "",
    descripcion: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(!createsTask);
  console.log({
    id,
    project_id,
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
    if (createsTask) {
      return;
    }
    setIsLoading(true);

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `https://my-json-server.typicode.com/gcaldev/psa-mock/tareas/${id}`;

    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        const { fechaInicio, fechaFin, ...rest } = res;
        setTaskInfo({
          ...rest,
          fechaInicio: fechaInicio ?? "",
          fechaFin: fechaFin ?? "",
        });
        console.log(res);
        setIsLoading(false);
      })
      .catch((err) => router.push("/error"));
  }, []);

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  const handleTaskSubmit = () => {
    setIsLoading(true);

    const method = createsTask ? "POST" : "PUT";
    const body = createsTask ? { ...taskInfo, id: undefined } : taskInfo;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const url = `https://my-json-server.typicode.com/gcaldev/psa-mock/tareas/${id}`;
    console.log(options, "INFO");
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        router.push(
          createsTask
            ? `/tarea-creada/${taskInfo.project_id}`
            : `/tarea-actualizada/${taskInfo.project_id}`
        );
      })
      .catch((err) => router.push("/error"));
  };

  return (
    <div className="flex-1 justify-center">
      <h1 className="text-3xl font-bold">
        {createsTask ? "Crear tarea" : "Editar tarea"}
      </h1>
      <div className="grid grid-cols-6 gap-4 mt-8">
        <div className="col-span-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Titulo
          </label>
          <input
            type="text"
            value={taskInfo.titulo}
            className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
            onChange={(e) =>
              setTaskInfo((prev) => ({ ...prev, titulo: e.target.value }))
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
              setTaskInfo((prev) => ({ ...prev, fechaInicio: e.target.value }))
            }
            value={taskInfo.fechaInicio}
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
              setTaskInfo((prev) => ({ ...prev, fechaFin: e.target.value }))
            }
            value={taskInfo.fechaFin}
          />
        </div>
        <div className="col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Estado
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={taskInfo.estado}
            onChange={(e) =>
              setTaskInfo((prev) => ({ ...prev, estado: e.target.value }))
            }
          >
            <option value={DEFAULT_SELECT_VALUE}>Elegir</option>
            <option value="Sin Comenzar">Sin comenzar</option>
            <option value="En Progreso">En progreso</option>
            <option value="Finalizado">Terminado</option>
            <option value="Bloqueado">Bloqueado</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Prioridad
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={taskInfo.prioridad}
            onChange={(e) =>
              setTaskInfo((prev) => ({ ...prev, prioridad: e.target.value }))
            }
          >
            <option value={DEFAULT_SELECT_VALUE}>Elegir</option>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Asignado
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={taskInfo.asignado}
            onChange={(e) =>
              setTaskInfo((prev) => ({ ...prev, asignado: e.target.value }))
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
        <div className="col-span-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Descripción
          </label>
          <textarea
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) =>
              setTaskInfo((prev) => ({ ...prev, descripcion: e.target.value }))
            }
            value={taskInfo.descripcion}
          ></textarea>
        </div>
      </div>
      <div></div>
      <div className="flex justify-end items-center gap-4 mt-8">
        <Link href={`/tablero/${project_id}`}>Volver a tablero</Link>
        <button
          className="bg-sky-500	hover:bg-cyan-600 text-white font-bold py-1 px-4 rounded"
          onClick={handleTaskSubmit}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
