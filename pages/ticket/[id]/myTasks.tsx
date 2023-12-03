import {useEffect, useState} from "react";
import Link from "next/link";
import TicketGridRow from "@/components/ticketGridRow"; //traer ticketGrindRow
import { useRouter } from 'next/router';
import {Ticket, Tarea, TaskTicketAsoc, Cliente} from "@/types/types";
import useFetch from "@/hooks/useFetch";

import TaskLayout from "@/components/TaskLayout";


//import TicketCreate from "@/Components/TicketCreate";

type PreviewTaskType = {
    project_id: string
    estado: string
    fechaInicio: string
    fechaFin: string
    prioridad: string
    asignado: string
    titulo: string
    id: string
    descripcion: string
  };
  
  type ItemTableroType = {
      tareas: Tarea[];
  };
type TaskTicket = {
    taskId: string
    ticketId: string
}

const Tarea = ({
                   project_id,
                   estado,
                   fechaInicio,
                   fechaFin,
                   prioridad,
                   asignado,
                   titulo,
                   id,
                   descripcion,
                   onClick,
  }: PreviewTaskType & { onClick?: any }): JSX.Element => {
    return (
        <article
          //className="flex flex-col p-4 bg-white	 rounded-xl m-8 c h-[150px] w-[250px] cursor-pointer"
          className ="rounded-md bg-zinc-300 border-4 border-zinc-600 px-4 py-2 my-2 cursor-pointer"
          id={id}
          onClick={() => onClick(id)}
        >
        <div className="flex">
            <div className="flex-1 place-content-start ">
                <p className="text-4xl m-0 font-bold" >  
                    {/* <span className="font-bold" >Nombre: </span> */}
                    <span>{titulo}</span>
                </p>
                <p className="m-0" >  
                    <span className="" >Descripción: </span>
                    <span>{descripcion}</span>
                </p>
                <p className="m-0" >  
                    <span>fecha de inicio: </span>
                    <span>{fechaInicio}</span>
                </p>
            </div>
        
            <div className=" grid place-content-around flex-2 text-xl">
                <div className="flex justify-items-center flex-row">
                    <p className="m-0" >  
                        <span className= "font-bold">Estado: </span>
                        <span>{estado}</span>
                    </p>
                    <p className="ml-4" >  
                        <span className= "  font-bold">Asignado </span>
                        <span>{asignado}</span>
                    </p>
                    <p className="ml-4" >  
                        <span className= "font-bold">Proyecto </span>
                        <span>{project_id}</span>
                    </p>
                </div>
                <div className="flex flex-row ">
                <p className="m-0" >  
                        <span className= "font-bold">Prioridad </span>
                        <span>{prioridad}</span>
                    </p>
                    <p className="ml-7" >  
                        <span className= "  font-bold">Fecha de fin </span>
                        <span>{fechaFin}</span>
                    </p>
                </div>
            </div>
        </div>
        </article>

      );
    };


const ListadoItem = ({
    tareas,
    onClick

}: ItemTableroType & { onClick?: any }): JSX.Element => {
    return (    
        
        <div className="">
        <div>
          {tareas.map((tarea) => (
            <Tarea {...tarea} onClick={onClick} />
          ))}
        </div>
      </div>
    );
  };


export default function TaskswithTicket() {

    const [listadoTareas, setListadoTareas] = useState<Tarea[]>([]);
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [asoc, setTaskTicketAsoc] = useState<TaskTicketAsoc[]>([]);

    const [filteredList, setFilteredList] = useState<Tarea[] | null>(null);
    const [searchName, setSearchName] = useState<string>("");
    const [taskticketInfo, setTaskTicketInfo] = useState({
        taskId: "",
        ticketId: ""
    });
    const router = useRouter();
    const [show, setShow] = useState<boolean>(false);
    const [wantsToDelete, setWantsToDelete] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<Tarea | null>(null);

    const { data, error, loading, fetchData } = useFetch<Tarea[]>();
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [loadedTasks, setLoadedTasks] = useState<boolean>(false);
    const [loadedAssociations, setAssociations] = useState<boolean>(false);
    let fetch_url = `https://my-json-server.typicode.com/gcaldev/psa-mock/tareas/`;
    let id_ticket: string = '0';
    if(router.query.id) {
        id_ticket = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
        fetch_url = `https://soporte-psa-lor9.onrender.com/ticket/${id_ticket}/mytasks`;
    }

    //const fetch_url = "https://soporte-psa-lor9.onrender.com/tickets"
    const [asociaciones, setAssociaciones] = useState<TaskTicketAsoc[]>([]);

    useEffect(() => {
      if (router.isReady) {
        fetchData(fetch_url);
      }
    }, [router.isReady]);
    if (loading || deleteLoading) {
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

    if (error) {
        router.push("/error");
        return;
      }
      if (!data) return;


    const generateTicketTaskAsoc = (id: string, id_tarea: string, id_proyecto:string, onSuccess?: Function) => {
      // const deleteUrl = "https://my-json-server.typicode.com/squad-7-psa-2023-2c/server-squad-7/tickets"
      //#TODO ACA HAY Q GENERAR LA ASOCIACION NO SE COMO...
      const create_asociations_url = ` https://soporte-psa-lor9.onrender.com/${id},`;
      const options = {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
      };
      setDeleteLoading(true);
      fetch(create_asociations_url, options)
          .then((res) => res.json())
          .then((res) => {
          setDeleteLoading(false);
          fetchData(fetch_url, "POST");
          onSuccess?.();
          })
          .catch((err) => router.push("/error"));
      };

    const handleBorrarAsoc = async () => {
        const url = `https://soporte-psa-lor9.onrender.com/ticket/${id_ticket}/task/${selectedTask?.id}`;
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        fetch(url, options)
            .then((res) => res.json())
            .then((res) => {
                setShow(false);
                setWantsToDelete(false);
                setSelectedTask(null);
                location.reload();
            })
            .catch((err) => {
                setShow(false);
                setWantsToDelete(false);
                setSelectedTask(null);
                location.reload();
            })

            //TIKCET DELET
    };
    const handleSuccessAssociation = async () => {
        //aca va una ventana de que se asocio con exito
    }
    const handleTaskSelection = (id: string): void => {
      
        setShow(!show);
        const tareaToOpen = data.find((tarea) => tarea.id === id);
        if (!tareaToOpen) {
          return;
        }
        
        console.log("Id tarea elegida", id);
        
        //FETCH DE TASK TICKETS ASOC
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const url = `https://soporte-psa-lor9.onrender.com/ticket/${id}/task`;
    
        fetch(url, options)
          .then((res) => res.json())
          .then((res) => {
            setTaskTicketAsoc(res);
            //setIsLoading(false);
          })
          .catch((err) => router.push("/error"));
        
        console.log("tareas en ticket selectionmnn", asoc);

        setSelectedTask(tareaToOpen);
      };


    const handleTicketDelete = async (id?: string) => {
    console.log("tarea_id en handledelteticket:",id )
    const closeModal = () => {
        setShow(false);
        setWantsToDelete(false);
        setSelectedTask(null);
    };

    if (id) {
        deleteTicket(id, closeModal);
    } else {
        closeModal();
    }
    };
    
    const deleteTicket = (id: string, onSuccess?: Function) => {
    // const deleteUrl = "https://my-json-server.typicode.com/squad-7-psa-2023-2c/server-squad-7/tickets"
    const deleteUrl = `https://soporte-psa-lor9.onrender.com//ticket/${id}`;
    const options = {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
    };
    setDeleteLoading(true);
    fetch(deleteUrl, options)
        .then((res) => res.json())
        .then((res) => {
        setDeleteLoading(false);
        fetchData(fetch_url, "GET");
        onSuccess?.();
        })
        .catch((err) => router.push("/error"));
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data) {
        const filteredTickets = data.filter((tarea) =>
        tarea?.titulo?.toLowerCase().includes(searchName?.toLowerCase())
        );

        setFilteredList(filteredTickets);
    }
    };

    const currentList = filteredList ?? data;
      var urlString = window.location.href;
      var url_2 = new URL(urlString);
      var productid = url_2.pathname.split('/')[2];
      var versionid = url_2.pathname.split('/')[3];
          
    return (
      <div className="flex-1">
        <h1 className="text-3xl font-bold">Listado De Tareas</h1>
        <div className="flex justify-between items-center pt-8">
          <form
            onSubmit={handleSearch}
            className="flex border-solid border-2 border-zinc-400"
          >
            <input
              className="py-1 px-2 bg-sky-50"
              type="text"
              placeholder="Buscar por nombre"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchName(e.target.value);
              }}
              value={searchName}
            />
            <button className="bg-sky-50 hover:bg-zinc-200 px-1">🔍</button>
          </form>
          <Link
            
            className="bg-sky-500	hover:bg-cyan-600 text-white font-bold py-1 px-4 rounded"
            href={`/proyectos`}
          >
            Crear Tarea ✚
          </Link>
        </div>

        <div className="mt-8 flex flex-col justify-center">
            <ListadoItem
              tareas={data}
              //estado={"Sin Comenzar"}
              //estadoLabel={"Sin comenzar"}
              onClick={handleTaskSelection}
            />
          {/* {!currentList || currentList.length < 1 ? (
            <h1 className="self-center">
              No se encontraron tickets con el nombre especificado
            </h1>
          ) : (
            currentList?.map((ticket) => <TicketItem {...ticket} />)
          )
          }
           */}
        </div>
        <Modal
        className={"h-[550px] w-[500px] border border-black p-4"}
        show={show && !wantsToDelete}
        onClick={() => {
          setShow(false);
          setSelectedTask(null);
        }}
      >
        <div className="grid grid-cols-2 px-2 py-2 mt-2 border border-black p-4">
          <div className="flex w-80 mb-5">
            <h2 className="col-span-2 text-2xl font-semibold">
              {selectedTask?.titulo}
            </h2>
          </div>

          <p className="col-span-2 font-semibold">Descripción</p>
          <p className="col-span-2 mb-5">{selectedTask?.descripcion}</p>

          <p className="font-semibold">Estado</p>
            <p className="mb-5">{selectedTask?.estado}</p>
          <p className="font-semibold">Prioridad</p>
            <p className="mb-5">{selectedTask?.estado}</p>
          <p className="font-semibold">Proyecto</p>
          <p className="mb-5">{selectedTask?.project_id}</p>
            <p className="font-semibold">Asignada a</p>
            <p className="mb-5">{selectedTask?.asignado}</p>
          <div className="flex mb-5">
          </div>
          
        </div>
            <div className="flex justify-between items-end gap-8">
                <button
                    className="bg-red-500 hover:bg-red-800 text-white font-bold py-1 px-4 rounded"
                    onClick={() =>
                        handleBorrarAsoc()}
                >
                    Borrar Asociacion
                </button>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
                    onClick={() => {
                        setShow(false);
                        setWantsToDelete(false);
                        setSelectedTask(null);
                    }}
                >
                    Volver
                </button>
            </div>
      </Modal>
      <Modal
        className={"w-[500px] h-[360px] border border-black p-8"}
        show={wantsToDelete}
        onClick={() => {
          setShow(false);
          setWantsToDelete(false);
          setSelectedTask(null);
        }}
      >
        <div className="flex flex-col">
          <div className="border border-black p-4 mt-2">
            <p className="font-bold mb-4 mt-4 text-center">
              ¿Está seguro de que desea eliminar la tarea seleccionada?
            </p>
            <p className="mb-5">
              Esta acción no se puede deshacer y toda la información asociada a
              esta tarea se perderá. Por favor, confirme su decisión antes de
              proceder.
            </p>
          </div>
          <div className="flex flex-1 justify-end mt-7 items-end gap-8 items-center">
            <button
              className="bg-red-500	hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
              onClick={() => handleTicketDelete(selectedTask?.id)}
            >
              Confirmar
            </button>
            <button
              className="font-bold text-sky-500	hover:text-cyan-600"
              onClick={() => {
                setShow(false);
                setWantsToDelete(false);
                setSelectedTask(null);
              }}
            >
              Cancelar
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