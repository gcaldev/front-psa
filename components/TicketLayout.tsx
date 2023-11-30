//import { Ticket } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DEFAULT_SELECT_VALUE = "Elegir";

export default function TicketLayout({
  //id = "",
  //project_id,

  id_ticket ="",
  producto_id,
  version_id,
  
  // nombre,
  // descripcion,
  // fecha_de_creacion,
  // estado,
  // severidad,
  // prioridad,
  // cliente,
  // asignado,
  // comentarios,
}: {
  id_ticket?: string;
  //project_id: string;
  producto_id: string
  version_id: string

  // nombre: string
  // descripcion: string
  // fecha_de_creacion: string
  // estado: string
  // severidad: string
  // prioridad: string
  // cliente: string
  // asignado: string,
  // comentarios: string

  

}) {
  const createsTicket = !id_ticket;
  const router = useRouter();
  const [taskInfo, setTaskInfo] = useState({
    producto_id,
    version_id,
    
    fecha_de_creacion: "",
    
    estado: DEFAULT_SELECT_VALUE,
    severidad: DEFAULT_SELECT_VALUE,
    prioridad: DEFAULT_SELECT_VALUE,
    asignado: DEFAULT_SELECT_VALUE,
    cliente: DEFAULT_SELECT_VALUE,
    nombre: "",
    id_ticket: "",
    descripcion: "",
    comentarios: "",


  });
  const [isLoading, setIsLoading] = useState<boolean>(!createsTicket);
  console.log({
    id_ticket,
    producto_id,
    version_id,  
  });
  //const [resources, setResources] = useState<Ticket[]>([]);
  useEffect(() => {
    if (createsTicket) {
      return;
    }
    setIsLoading(true);

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `https://psa-prueba-2.onrender.com/tickets`;

    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        const { fechaIfecha_de_creacion, estado, ...rest } = res;
        setTaskInfo({
          ...rest,
          fechaInicio: fechaIfecha_de_creacion ?? "",
          fechaFin: estado ?? "",
        });
        console.log(res);
        setIsLoading(false);
      })
      .catch((err) => router.push("/error"));
  }, []);

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  const handleTicketSubmit = () => {
    setIsLoading(true);

    const method = createsTicket ? "POST" : "PUT";
    const body = createsTicket ? { ...taskInfo, id: undefined } : taskInfo;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const url = `https://psa-prueba-2.onrender.com/tickets`;
    console.log(options, "INFO");
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        router.push("/exito");
      })
      .catch((err) => router.push("/error"));
  };
  console.log(taskInfo);
  return (
    <div className="flex-1 justify-center">
      <h1 className="text-3xl font-bold">
        {createsTicket ? "Crear tarea" : "Editar tarea"}
      </h1>
      <div className="grid grid-cols-6 gap-4 mt-8">
        <div className="col-span-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Nombre
          </label>
          <input
            type="text"
            value={taskInfo.nombre}
            className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
            onChange={(e) =>
              setTaskInfo((prev) => ({ ...prev, nombre: e.target.value }))
            }
          />
        </div>
        <div className="col-span-3">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Fecha de creacion
          </label>
          <input
            type="date"
            id="start"
            name="trip-start"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) =>
              setTaskInfo((prev) => ({ ...prev, fecha_de_creacion: e.target.value }))
            }
            value={taskInfo.fecha_de_creacion}
          />
        </div>
        <div className="col-span-3">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            severidad
          </label>
          <input
            type="date"
            id="start"
            name="trip-start"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) =>
              setTaskInfo((prev) => ({ ...prev, severidad: e.target.value }))
            }
            value={taskInfo.severidad}
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
            <option value="Ricardo">Ricardo</option>
            <option value="Juan">Juan</option>
            <option value="Pedro">Pedro</option>
            <option value="Ezequiel">Ezequiel</option>
          </select>
        </div>
        <div className="col-span-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Descripción
          </label>
          <textarea
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your thoughts here..."
            onChange={(e) =>
              setTaskInfo((prev) => ({ ...prev, descripcion: e.target.value }))
            }
            value={taskInfo.descripcion}
          ></textarea>
        </div>
      </div>
      <div></div>
      <div className="flex justify-end items-center gap-4 mt-8">
        <Link href={`/tablero/${version_id}`}>Volver a tablero</Link>
        <button
          className="bg-sky-500	hover:bg-cyan-600 text-white font-bold py-1 px-4 rounded"
          onClick={handleTicketSubmit}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}