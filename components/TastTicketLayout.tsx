import {Recurso, Ticket, Cliente, Tarea, TaskTicket} from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {create} from "domain";

const DEFAULT_SELECT_VALUE = "Elegir";

export default function TicketLayout({
  id_ticket ="",
  producto_id,
  version_id,

}: {
  id_ticket?: string;
  producto_id: string;
  version_id: string;
}) {
  const createsTicket = !id_ticket;
  const router = useRouter();


  const [ticketInfo, setTicketInfo] = useState({
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
  console.log("en ticket layout", {
    id_ticket,
    producto_id,
    version_id,  
  });
  const [tareas, setTareas] = useState<Tarea[]>([]);

  useEffect(() => {
    setIsLoading(true);

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `https://my-json-server.typicode.com/gcaldev/psa-mock/tareas/`;

    fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          setTareas(res);
          setIsLoading(false);
        })
        .catch((err) => router.push("/error"));
  }, []);
  const [ticket, setTicket] = useState<Ticket>();

  useEffect(() => {
    setIsLoading(true);

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `https://soporte-psa-lor9.onrender.com/ticket/${id_ticket}`;

    fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          setTicket(res);
          setIsLoading(false);
        })
        .catch((err) => router.push("/error"));
  }, []);
  const [taskticketInfo, setTaskTicketInfo] = useState({
    taskId: "",
    ticketId: ticketInfo.id_ticket
  });
  //creo q estyo no va 
  //use effect 2. Cual es la diferencia??

  if (isLoading) {
    return(
        <div className="text-center py-40">
            <div role="status">
                <svg aria-hidden="true" className="inline w-22 h-22 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
            <h1 className="text-2xl font-semibold mt-5">Cargando...</h1>
        </div>
    );
  }

  const handleTicketSubmit = () => {
    
    setIsLoading(true);

    const method = "POST";

    const body = createsTicket ? { ...taskticketInfo, id_ticket: ticket?.id_ticket } : { ...taskticketInfo, id_ticket: ticket?.id_ticket };
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    console.log("ticket info en handle ssubmit: ",ticketInfo)
    alert(taskticketInfo?.taskId);
    alert(taskticketInfo?.ticketId);
    const url = `https://soporte-psa-lor9.onrender.com/ticket/task`;

    //const url = `https://my-json-server.typicode.com/
    //squad-7-psa-2023-2c/server-squad-7/tickets/${id_ticket}`;
    console.log(options, "INFO");
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        router.push(
            createsTicket
                ? `/soporte/${producto_id}/${version_id}`
                : `/soporte/${producto_id}/${version_id}`
        );

      })
      
      .catch((err) => router.push(
          createsTicket
              ? `/soporte/${producto_id}/${version_id}`
              : `/soporte/${producto_id}/${version_id}`
      ));
  };

  return (
    <div className="flex-1 justify-center">
      <h1 className="text-3xl font-bold">
        {createsTicket ? "Crear ticket" : "Asociar Tarea"}
      </h1>
      <div className="grid grid-cols-6 gap-4 mt-8">
        <div className="col-span-6">
        <label className="block mb-2 text-sm font-medium text-gray-900">
           Asociar {ticketInfo.id_ticket}
          </label>
          <label className="block mb-2 font-semibold text-2xl gray-900">
            Nombre: {ticket?.nombre}
          </label>

        </div>
        <div className="col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Tareas
          </label>
          <select
            id="countries-2"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={taskticketInfo?.taskId}
            onChange={(e) =>
                setTaskTicketInfo((prev) => ({ ...prev, taskId: e.target.id }))
            }
          >
            <option value={DEFAULT_SELECT_VALUE}>Elegir</option>
            {tareas.map((tareas: Tarea) => {
              const fullName = `${tareas.id} ${tareas.titulo} `;
              return (
                  <option id={tareas.id} value={tareas.id}>
                    {fullName}
                  </option>
              );
            })}
          </select>
        </div>
      </div>
      <div></div>
      <div className="flex justify-end items-center gap-4 mt-8">
        {/* <Link href={`/tablero/${version_id}`}>Volver a tablero</Link> */}
        <button
          className="bg-sky-500	hover:bg-cyan-600 text-white font-bold py-1 px-4 rounded"
          onClick={handleTicketSubmit}
        >
          {createsTicket ? "Crear ticket" : "Editar ticket"}
        </button>
      </div>
    </div>
  );
}
