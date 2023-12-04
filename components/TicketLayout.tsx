import {Recurso, Ticket, Cliente} from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {create} from "domain";

const DEFAULT_SELECT_VALUE = "";
const today = new Date();

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
  const [showExtraMessage, setShowExtraMessage] = useState<boolean>(false);
  const [extraMessage, setExtraMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(!createsTicket);
  const [goBack, setGoBack] = useState<boolean>(false);
  console.log("en ticket layout", {
    id_ticket,
    producto_id,
    version_id,  
  });
  const [recursos, setRecursos] = useState<Recurso[]>([]);

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
          setRecursos(res);
          setIsLoading(false);
        })
        .catch((err) => router.push("/error"));
  }, []);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    setIsLoading(true);

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `https://soporte-psa-lor9.onrender.com/Clientes`;

    fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          setClientes(res);
          setIsLoading(false);
        })
        .catch((err) => router.push("/error"));
  }, []);
  
  //creo q estyo tampoco va
  //use effect 1
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
    const url = `https://soporte-psa-lor9.onrender.com/ticket/${id_ticket}`;

    fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          const { fechaInicio, fechaFin, ...rest } = res;
          setTicketInfo({
            ...rest,
            fechaInicio: fechaInicio ?? "",
            fechaFin: fechaFin ?? "",
          });
          console.log(res);
          setIsLoading(false);
        })
        .catch((err) => router.push("/error"));
  }, []);
  
  
  //creo q estyo no va 
  //use effect 2. Cual es la diferencia??
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
    //const url = `https://psa-prueba-2.onrender.com/tickets`;
    const url = "https://my-json-server.typicode.com/squad-7-psa-2023-2c/server-squad-7/tickets"
    
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        const { fechaIfecha_de_creacion, estado, ...rest } = res;
        setTicketInfo({
          ...rest,
          fechaInicio: fechaIfecha_de_creacion ?? "",
          fechaFin: estado ?? "",
        });
        console.log(res);
        setIsLoading(false);
      })
      .catch((err) =>
          router.push("/error"));
  }, []);

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
    if(!ticketInfo.fecha_de_creacion) {
      setExtraMessage("No se puede crear o guardar un ticket sin fecha de creación")
      setShowExtraMessage(true);
    } else if (!ticketInfo.nombre){
      setExtraMessage("No se puede crear o guardar un ticket sin nombre")
      setShowExtraMessage(true);
    } else if (!ticketInfo.descripcion) {
      setExtraMessage("No se puede crear o guardar un ticket sin descripción")
      setShowExtraMessage(true);
    } else if (ticketInfo.cliente == DEFAULT_SELECT_VALUE) {
      setExtraMessage("No se puede crear o guardar un ticket sin cliente")
      setShowExtraMessage(true);
    } else if (ticketInfo.severidad == DEFAULT_SELECT_VALUE) {
      setExtraMessage("No se puede crear o guardar un ticket sin severidad")
      setShowExtraMessage(true);
    }  else if (ticketInfo.prioridad == DEFAULT_SELECT_VALUE) {
      setExtraMessage("No se puede crear o guardar un ticket sin prioridad")
      setShowExtraMessage(true);
    } else {
      //setIsLoading(true);

      const method = createsTicket ? "POST" : "PUT";
      const body = createsTicket ? {...ticketInfo, id: undefined} : ticketInfo;
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };
      console.log("ticket info en handle ssubmit: ", ticketInfo)

      const url = `https://soporte-psa-lor9.onrender.com/ticket/${id_ticket}`;

      //const url = `https://my-json-server.typicode.com/
      //squad-7-psa-2023-2c/server-squad-7/tickets/${id_ticket}`;
      console.log(options, "INFO");
      fetch(url, options)
          .then((res) => {
            createsTicket
                  ? setExtraMessage("Ticket creado con éxito ")
                  : setExtraMessage("Ticket modificado con éxito");
            setGoBack(true);
          })

          .catch((err) => router.push(
              createsTicket
                  ? `/soporte/${producto_id}/${version_id}`
                  : `/soporte/${producto_id}/${version_id}`
          ));
    }};

  return (
    <div className="flex-1 justify-center">
      <h1 className="text-3xl font-bold">
        {createsTicket ? "Crear ticket" : "Editar ticket"}
      </h1>
      <div className="grid grid-cols-6 gap-4 mt-8">
        <div className="col-span-6">
        <label className="block mb-2 text-sm font-medium text-gray-900">
           Ticket {ticketInfo.id_ticket}
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Nombre
          </label>
          <input
            type="text"
            value={ticketInfo.nombre}
            className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
            onChange={(e) =>
              setTicketInfo((prev) => ({ ...prev, nombre: e.target.value }))
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
              setTicketInfo((prev) => ({ ...prev, fecha_de_creacion: e.target.value }))
            }
            value={ticketInfo.fecha_de_creacion}
          />
        </div>
        <div className="col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Estado
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={ticketInfo.estado}
            onChange={(e) =>
              setTicketInfo((prev) => ({ ...prev, estado: e.target.value }))
            }
          >
            <option value="Abiertor">Abierto</option>
            <option value="En progreso">En progreso</option>
            <option value="En desarrollo">En desarrollo</option>
            <option value="En implementacion">En implementacion</option>
            <option value="Esperando al cliente">Esperando al cliente</option>
            <option value="Bloqueado">Bloqueado</option>
            <option value="Resuelto">Resuelto</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900">
          Severidad
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={ticketInfo.severidad}
            onChange={(e) =>
              setTicketInfo((prev) => ({ ...prev, severidad: e.target.value }))
            }
          >
            <option value={DEFAULT_SELECT_VALUE}>Elegir</option>
            <option value="S-1">S1</option>
            <option value="S-2">S2</option>
            <option value="S-3">S3</option>
            <option value="S-4">S4</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Prioridad
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={ticketInfo.prioridad}
            onChange={(e) =>
              setTicketInfo((prev) => ({ ...prev, prioridad: e.target.value }))
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
            id="countries-2"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={ticketInfo.asignado}
            onChange={(e) =>
              setTicketInfo((prev) => ({ ...prev, asignado: e.target.value }))
            }
          >
            <option value={DEFAULT_SELECT_VALUE}>Elegir</option>
            {recursos.map((recursos: Recurso) => {
              const fullName = `${recursos.nombre} ${recursos.apellido}`;
              return (
                  <option id={recursos.legajo} value={recursos.legajo}>
                    {fullName}
                  </option>
              );
            })}
          </select>
        </div>
        <div className="col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Cliente
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={ticketInfo.cliente}
            onChange={(e) =>
              setTicketInfo((prev) => ({ ...prev, cliente: e.target.value }))
            }
          >
            <option value={DEFAULT_SELECT_VALUE}>Elegir</option>
            {clientes.map((clientes: Cliente) => {
              const fullName = `${clientes.razonSocial}`;
              return (
                  <option id={clientes.id} value={clientes.id}>
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
            rows={2}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your thoughts here..."
            onChange={(e) =>
              setTicketInfo((prev) => ({ ...prev, descripcion: e.target.value }))
            }
            value={ticketInfo.descripcion}
          ></textarea>
        </div>
        <div className="col-span-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Comentarios
          </label>
          <textarea
              rows={2}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your thoughts here..."
              onChange={(e) =>
                  setTicketInfo((prev) => ({ ...prev, comentarios: e.target.value }))
              }
              value={ticketInfo.comentarios}
          ></textarea>
        </div>
      </div>
      <div></div>
      <div className="flex justify-end items-center gap-4 mt-8">
        {/* <Link href={`/tablero/${version_id}`}>Volver a tablero</Link> */}
        <button
          className="bg-sky-500	hover:bg-cyan-600 text-white font-bold py-1 px-4 rounded"
          onClick={handleTicketSubmit}
        >
          {createsTicket ? "Crear ticket" : "Guardar Ticket"}
        </button>
      </div>
      <Modal
          className={"grid border border-black p-8"}
          show={showExtraMessage}
          onClick={() => {
            setShowExtraMessage(false);
          }}
      >
        <div className="flex flex-col">
          <div className="mt-2">
            <p className="mb-5">
              {extraMessage}
            </p>
          </div>
          <div className="flex flex-1 justify-center mt-7 items-end gap-8 items-center">
            <button
                className="bg-green-500	hover:bg-green-600 text-white font-bold py-1 px-4 rounded"
                onClick={() => setShowExtraMessage(false)}
            >
              OK
            </button>
          </div>
        </div>
      </Modal>
      <Modal
          className={"grid border border-black p-8"}
          show={goBack}
          onClick={() => {
            setGoBack(false);
            router.push(
                createsTicket
                    ? `/soporte/${producto_id}/${version_id}`
                    : `/soporte/${producto_id}/${version_id}`
            );
          }}
      >
        <div className="flex flex-col">
          <div className="mt-2">
            <p className="mb-5">
              {extraMessage}
            </p>
          </div>
          <div className="flex flex-1 justify-center mt-7 items-end gap-8 items-center">
            <button
                className="bg-green-500	hover:bg-green-600 text-white font-bold py-1 px-4 rounded"
                onClick={() => {
                  setGoBack(false);
                  router.push(
                      createsTicket
                          ? `/soporte/${producto_id}/${version_id}`
                          : `/soporte/${producto_id}/${version_id}`
                  );
                }}
            >
              OK
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
const Modal = ({
                 show,
                 children,
                 onClick,
                 className,
               }: {
  show?: boolean;
  children: React.ReactNode;
  onClick: any;
  className?: string;
}): JSX.Element => {
  if (!show) {
    return <></>;
  }
  return (
      <>
        <div className="flex justify-center items-center fixed top-0 left-0 z-10 h-screen w-screen">
          <div
              className={`flex flex-col bg-white p-8 rounded ${className ?? ""}`}
          >
            <button className="font-bold text-3xl self-end" onClick={onClick}>
              ✕
            </button>
            {children}
          </div>
        </div>
        <div className="fixed top-0 left-0 h-screen w-screen bg-zinc-900 opacity-30 !overflow-hidden"></div>
      </>
  );
};
