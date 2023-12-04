import { PROJECT_MODULE_URL } from "@/env-vars";
import { Recurso, Tarea } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DEFAULT_SELECT_VALUE = "Elegir";

type InfoValidationType = {
  fechaInicio: boolean;
  fechaFin: boolean;
  estado: boolean;
  prioridad: boolean;
  asignado: boolean;
  titulo: boolean;
  descripcion: boolean;
};

export default function TaskLayout({
  id = "",
  projectId,
}: {
  id?: string;
  projectId: string;
}) {
  const createsTask = !id;
  const router = useRouter();
  const [infoValidation, setInfoValidation] = useState<InfoValidationType>({
    fechaInicio: false,
    fechaFin: false,
    estado: false,
    prioridad: false,
    asignado: false,
    titulo: false,
    descripcion: false,
  });

  const [taskInfo, setTaskInfo] = useState({
    projectId: projectId,
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

  const [resources, setResources] = useState<Recurso[]>([]);

  useEffect(() => {
    setIsLoading(true);

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `https://soporte-psa-lor9.onrender.com/Recursos`;

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
    const url = `${PROJECT_MODULE_URL}/tareas/${id}`;

    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        const { fechaInicio, fechaFin, ...rest } = res;
        setTaskInfo({
          ...rest,
          fechaInicio: fechaInicio ?? "",
          fechaFin: fechaFin ?? "",
        });
        setIsLoading(false);
      })
      .catch((err) => router.push("/error"));
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-40">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-22 h-22 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
        <h1 className="text-2xl font-semibold mt-5">Cargando...</h1>
      </div>
    );
  }

  const handleTaskSubmit = () => {
    const validations = {
      estado: taskInfo.estado === DEFAULT_SELECT_VALUE,
      asignado: false,
      prioridad: taskInfo.prioridad === DEFAULT_SELECT_VALUE,
      fechaInicio: Boolean(
        taskInfo.fechaInicio &&
          taskInfo.fechaFin &&
          new Date(taskInfo.fechaInicio) > new Date(taskInfo.fechaFin)
      ),
      fechaFin: false,
      titulo: !taskInfo.titulo,
      descripcion: !taskInfo.descripcion,
    };

    setInfoValidation(validations);

    const invalidForm = Object.values(validations).some(
      (validation) => validation
    );

    if (invalidForm) return;

    setIsLoading(true);

    const method = createsTask ? "POST" : "PUT";
    const body = {
      ...taskInfo,
      id: createsTask ? undefined : taskInfo.id,
      fechaInicio: taskInfo.fechaInicio ?? undefined,
      fechaFin: taskInfo.fechaFin ?? undefined,
      asignado:
        taskInfo.asignado !== DEFAULT_SELECT_VALUE
          ? taskInfo.asignado
          : undefined,
    };
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const url = createsTask
      ? `${PROJECT_MODULE_URL}/tareas/${id}`
      : `${PROJECT_MODULE_URL}/tareas`;

    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        router.push(
          createsTask
            ? `/tarea-creada/${taskInfo.projectId}`
            : `/tarea-actualizada/${taskInfo.projectId}`
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

          {infoValidation.titulo && (
            <label className="block mt-2 text-sm font-medium text-red-500">
              Completa un titulo
            </label>
          )}
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
          {infoValidation.fechaInicio && (
            <label className="block mt-2 text-sm font-medium text-red-500">
              La fecha de inicio debe ser previa a la de finalización
            </label>
          )}
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
            <option value="No Iniciado">No Iniciado</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Finalizado">Terminado</option>
            <option value="Bloqueado">Bloqueado</option>
          </select>
          {infoValidation.estado && (
            <label className="block mt-2 text-sm font-medium text-red-500">
              Selecciona un estado
            </label>
          )}
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
          {infoValidation.prioridad && (
            <label className="block mt-2 text-sm font-medium text-red-500">
              Selecciona una prioridad
            </label>
          )}
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
              const fullName = `${resource.nombre} ${resource.apellido}`;
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
          {infoValidation.descripcion && (
            <label className="block mt-2 text-sm font-medium text-red-500">
              Completa una descripción
            </label>
          )}
        </div>
      </div>
      <div></div>
      <div className="flex justify-end items-center gap-4 mt-8">
        <Link
          className="bg-zinc-0	hover:bg-zinc-100 text-black font-bold py-1 px-4 rounded"
          href={`/tablero/${projectId}`}
        >
          Volver a tablero
        </Link>
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
