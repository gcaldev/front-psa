import {useEffect, useState} from "react";
import Link from "next/link";
import TicketGridRow from "@/components/ticketGridRow"; //traer ticketGrindRow
import { useRouter } from 'next/router';
import {Ticket, Tarea, TaskTicketAsoc, Producto, Recurso, Cliente, Version} from "@/types/types";
import useFetch from "@/hooks/useFetch";
import TaskLayout from "@/components/TaskLayout";


//import TicketCreate from "@/Components/TicketCreate";

type PreviewTicketType = {
    id_ticket: string,
    nombre: string,
    descripcion: string,
    fecha_de_creacion: string,
    estado: string,
    severidad: string,
    prioridad: string,
    cliente: string,
    asignado: string,   
    comentarios: string,
    
    producto_id: string,
    version_id: string,
  };
  
  type ItemTableroType = {
    tickets: Ticket[];
    //estado: string;
    //estadoLabel: string;
  };

const Ticket = ({
    id_ticket,
    nombre,
    descripcion,
    fecha_de_creacion,
    estado,
    severidad,
    prioridad,
    cliente,
    asignado,   
    comentarios,
    producto_id,
    version_id,
    onClick,
  }: PreviewTicketType & { onClick?: any }): JSX.Element => {
    //const diasDesdeInicio = (fechaInicio: string): string => {
    //   const fechaPasada = new Date(fechaInicio).getTime();
    //   const fechaActual = new Date().getTime();
  
    //   const milisegundosPasados = fechaActual - fechaPasada;
  
    //   const diasPasados = Math.floor(milisegundosPasados / (1000 * 60 * 60 * 24));
  
    //   return `${diasPasados}d`;
    //};

    return (
        <article
          //className="flex flex-col p-4 bg-white	 rounded-xl m-8 c h-[150px] w-[250px] cursor-pointer"
          className ="rounded-md bg-zinc-300 border-4 border-zinc-600 px-4 py-2 my-2 cursor-pointer"
          id={id_ticket}
          onClick={() => onClick(id_ticket)}
        >
        <div className="flex">
            <div className="flex-1 place-content-start ">
                <p className="text-4xl m-0 font-bold" >  
                    {/* <span className="font-bold" >Nombre: </span> */}
                    <span>{nombre}</span>
                </p>
                <p className="m-0" >  
                    <span className="" >Descripción: </span>
                    <span>{descripcion ? descripcion.substring(0,60) : descripcion}</span>
                </p>
                <p className="m-0" >  
                    <span>fecha de creación: </span>
                    <span>{fecha_de_creacion}</span>
                </p>
            </div>
        
            <div className=" grid place-content-around flex-2 text-xl">
                <div className="flex justify-items-center flex-row">
                    <p className="m-0" >  
                        <span className= "font-bold">Estado: </span>
                        <span>{estado}</span>
                    </p>
                     <p className="ml-4" >
                        <span className= "font-bold">Severidad </span>
                        <span>{severidad}</span>
                    </p>
                </div>
                <div className="flex flex-row ">
                <p className="m-0" >  
                        <span className= "font-bold">Prioridad </span>
                        <span>{prioridad}</span>
                    </p>
                </div>
            </div>
        </div>
        
        {/* <div className="place-self-center flex-2">   
            <p className= "text-align: center p-1 font-bold ">
                <Link
                    className=" justify-self-center bg-zinc-50 hover:bg-zinc-100 text-black py-1 px-1"
                    //href={`/soporte/${encodeURIComponent(id_ticket)}`}
                    href={`/ticket/${id_ticket}?producto_id=${producto_id}?version_id=${version_id}`}
                    
                >  
                ver tareas asocidas
                </Link>
            </p>
        </div> 

        <div className="ml-3 flex-3">
            <p className= "relative left-10 font-bold ">
                🗑️
            </p>
            <button className="">
            <p className= "relative mt-5 self-center p-1 font-bold ">
            <Link  className=""
                href={`/ticket/${id_ticket}?version_id=${version_id}&producto_id=${producto_id}`}
                >
                <p className="text-base font-bold uppercase">{"EDITAR"}</p>
            </Link>
            Editar
            </p>            
            </button>
        </div>
         */}
        </article>

      );
    };
const longitudLinea: number = 40;

const ListadoItem = ({
    tickets,
    onClick
    // id_ticket,
    // nombre,
    // descripcion,
    // fecha_de_creacion,
    // estado,
    // severidad,
    // prioridad,
    // cliente,
    // asignado,   
    // //comentarios,
    // producto_id,
    // version_id,

}: ItemTableroType & { onClick?: any }): JSX.Element => {
    //const filteredTickets = tareas.filter((ticket) => ticket.estado === asignado);

    // Ticket): JSX.Element => {
    // const [wantsToDelete, setWantsToDelete] = useState<boolean>(false);
    // //const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    // const [show, setShow] = useState<boolean>(false);
    // //const router = useRouter();

    

    // if (!fechaInicio || !fechaFin) {
    //   // Hay que chequear si deberia poder no establecer fechas
    //   return <></>;
    // }
    return (    
        
        <div className="">
        <div>
          {tickets.map((ticket) => (
            <Ticket {...ticket} onClick={onClick} />
          ))}
        </div>
      </div>
    );
  };


  // const [taskInfo, setTaskInfo] = useState({
  //   project_id,
  //   fechaInicio: "",
  //   fechaFin: "",
  //   estado: DEFAULT_SELECT_VALUE,
  //   prioridad: DEFAULT_SELECT_VALUE,
  //   asignado: DEFAULT_SELECT_VALUE,
  //   titulo: "",
  //   id: "",
  //   descripcion: "",
  // }

function buscarNombredeRecurso(recursos: Recurso[] | null | undefined, recursoLegajo: string | null | undefined): string {
    if (!recursoLegajo )
        return '??';
    if(!recursos) {
        return recursoLegajo;
    }

    const proyectoEncontrado = recursos.find(proyecto => parseInt(proyecto.legajo,10) === parseInt(recursoLegajo,10));

    return proyectoEncontrado ? proyectoEncontrado.nombre+' '+proyectoEncontrado.apellido : recursoLegajo;
}
function buscarNombredeCliente(clientes: Cliente[] | null | undefined, clienteId: string | null | undefined): string {
    if (!clienteId )
        return '??';
    if(!clientes) {
        return clienteId;
    }

    const proyectoEncontrado = clientes.find(cliente => parseInt(cliente.id,10) === parseInt(clienteId,10));

    return proyectoEncontrado ? proyectoEncontrado.razonSocial : clienteId;
}
function addSpaces(textoLargo: String | null | undefined): String{
    let textoFormateado: string = ``;
    if (!textoLargo)
        return '------';
    for (let i = 0; i < textoLargo.length; i += longitudLinea) {
        const linea = textoLargo.substring(i, i + longitudLinea);
        textoFormateado += linea + "\n";
    }
    return textoFormateado;
}
function returnProdAndVers(productId: string | null | undefined,
                           versionId: string | null | undefined,
                           versions: Version[] | null | undefined,
                           product: Producto | null | undefined): String {
    if(!productId || !versionId || !versions || !product) {
        return '';
    }
    const versionCorrecta = versions.find(version => parseInt(versionId,10) == parseInt(version.id,10));
    if (!versionCorrecta)
        return '';

    return 'Producto: ' + product.producto + ', Version: ' + versionCorrecta.version;
}
export default function Tickets() {
    
    const [listadoTareas, setListadoTareas] = useState<Tarea[]>([]);
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [asoc, setTaskTicketAsoc] = useState<TaskTicketAsoc[]>([]);
    const [recursos, setRecursos] = useState<Recurso[]>();
    const [clientes, setClientes] = useState<Cliente[]>();
    const [filteredList, setFilteredList] = useState<Ticket[] | null>(null);
    const [searchName, setSearchName] = useState<string>("");
    const [showExtraMessage, setShowExtraMessage] = useState<boolean>(false);
    const router = useRouter();
    const [show, setShow] = useState<boolean>(false);
    const [wantsToDelete, setWantsToDelete] = useState<boolean>(false);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [extraMessage, setExtraMessage] = useState<string>('');
    const { data, error, loading, fetchData } = useFetch<Ticket[]>();
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [thisProduct, setThisProduct] = useState<Producto>();
    const [thisVersion, setVersions] = useState<Version[]>();
    var product_id = '0';
    var version_id = '0';
    if (typeof window !== 'undefined') {
        var urlString = window.location.href;
        var url = new URL(urlString);
        product_id = url.pathname.split('/')[2];
        version_id = url.pathname.split('/')[3];
    }
    const fetch_url = `https://soporte-psa-lor9.onrender.com/ticket/${product_id}/${version_id}`;
    //const fetch_url = "https://soporte-psa-lor9.onrender.com/tickets"
    useEffect(() => {
        //setIsLoading(true);

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
                ///setIsLoading(false);
            })
            .catch((err) => router.push("/error"));
    }, []);
    useEffect(() => {
        //setIsLoading(true);

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
                ///setIsLoading(false);
            })
            .catch((err) => router.push("/error"));
    }, []);
    useEffect(() => {
        //setIsLoading(true);

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const url = `https://my-json-server.typicode.com/nicolasgirardi/productos/productos/${product_id}`;

        fetch(url, options)
            .then((res) => res.json())
            .then((res) => {
                setThisProduct(res);
                ///setIsLoading(false);
            })
            .catch((err) => router.push("/error"));
    }, []);
    useEffect(() => {
        //setIsLoading(true);

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const url = `https://my-json-server.typicode.com/nicolasgirardi/productos/productos/${product_id}/versiones/`;

        fetch(url, options)
            .then((res) => res.json())
            .then((res) => {
                setVersions(res);
                ///setIsLoading(false);
            })
            .catch((err) => router.push("/error"));
    }, []);
    console.log(data);
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
  
    
    //#BORRAR SI SE ROMPE TODO
    //Aociation
    //FALTA COMPLETAR
    //tendria q mandar el ticket y traer tareas con su proyecto asociado
    // useEffect(() => {
    //   //setIsLoading(true);
  
    //   const options = {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   };
    //   const url = `https://soporte-psa-lor9.onrender.com//ticket/${ticketId}/task`;
  
    //   fetch(url, options)
    //     .then((res) => res.json())
    //     .then((res) => {
    //       setTareas(res);
    //       //setIsLoading(false);
    //     })
    //     .catch((err) => router.push("/error"));
    // }, []);
  
    
    

    //#BORRAR SI SE ROMPE TODO
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
    
    const handleTicketTaskAsoc = async (id?: string) => {
          const url_proyectos = ` https://back-proyectos-psa-2.onrender.com/proyectos,`; //cambiar luego a ulr
          console.log("tarea_id en handledelteticket:",id )
          const closeModal = () => {
              //setShow(false);
              //setWantsToDelete(false);
              //setSelectedTicket(null);
          };
          var id_tarea = "1"
          var id_proyecto = "32"
          if (id) {
            generateTicketTaskAsoc(id, id_tarea,id_proyecto, closeModal);
          } else {
              closeModal();
          }
          };
      
  
    
      //TIKCET DELETE
    const handleTicketSelection = (id: string): void => {
      
        setShow(!show);
        const ticketToOpen = data.find((ticket) => ticket.id_ticket === id);
        if (!ticketToOpen) {
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
       
      
        //FETCH DE NOMBRES DE TASKS ASOC A TICKETS
        
       //PREOBLMA, NO SE PUEDEN DEFINIR constantes en foreach
       //probelma 2 en map no ppuedo tener otro fetch

        //const url_fetch_tareas = `https://back-proyectos-psa-2.onrender.com/tareas/`;
        
        //LEEEEEEEEER
        //no se como hacer esto, por cada fecth me trae una sola tarea y x cada sola tarea necesito
        //convertirlo a un listado de tareas para poder hacer el map abajo.
        //IMPORTANTISMO: SI SE USA LA API DE GONZALO DE MYSJONSERVER
        //PARA TRAER /TAREAS/ID OJO XQ DEVUELVE UN {INFO TAREA}
        //HAY Q PONERLE [] PARA CONVERTIRLO EN ARRAY Y PODERLE APLICAR MAP
        // ASI SE SOLUCIONA EL BLABL.MAP is not a function
        //el problema igual no es ese... sino lo anterior. no se como hacer los loops
        //SUGIERO PARA SALIR DEL APURO YA  QM HOY ES DOMINGO
        // CONVERTIRLO EN UN BOTON QUE LLEVE UNA VENTANA APARTE, igualmente, hay q ver
        //como hacer xq para mnostrar texto de estas cosas por panatllas solo sabemos
        //hacerlo con el .map y eso solo funciona con estos objetos de la clase setblabla

      // asoc.map((asoc) =>
      //     fetch(url_fetch_tareas+asoc.taskId, options)
      //     .then((res) => res.json())
      //     .then((res) => {
      //       setTareas([res]);

      //       tareas.map((tarea) =>
      //       listado_tareas.push(tarea.titulo)
      //       )
          
      //   })
      // );
      // console.log(listado_tareas)
      // //listado_tareas => listado_tareas.json()
      // setListadoTareas(listadoTareas);
               
        //ABRIR MOCK CON TAREA
        setSelectedTicket(ticketToOpen);
      };
    
    const handleTicketDelete = async (id?: string) => {
    console.log("tarea_id en handledelteticket:",id )
    const closeModal = () => {
        setShow(false);
        setWantsToDelete(false);
        setSelectedTicket(null);
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
        .then((res) => {
        setWantsToDelete(false);
        setSelectedTicket(null);
        setShow(false);
        setDeleteLoading(false);
        setExtraMessage("El ticket ha sido eliminado con éxito");
        setShowExtraMessage(true);
        })
        .catch((err) => location.reload());
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data) {
        const filteredTickets = data.filter((ticket) =>
        ticket?.nombre?.toLowerCase().includes(searchName?.toLowerCase())
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
        <h1 className="text-3xl font-bold">Listado De Tickets</h1>
          <h1 className="text-2xl font-bold mt-2">{returnProdAndVers(product_id,version_id,thisVersion,thisProduct)}</h1>
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
            href={`/ticket/?producto_id=${productid}&version_id=${versionid}`}
          >
            Crear ticket ✚
          </Link>
        </div>

        <div className="mt-8 flex flex-col justify-center">
            <ListadoItem
              tickets={data.filter(ticket => ticket.nombre.toLowerCase().includes(searchName.toLowerCase()))}
              //estado={"Sin Comenzar"}
              //estadoLabel={"Sin comenzar"}
              onClick={handleTicketSelection}
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
        className={"grid border border-black p-4"}
        show={show && !wantsToDelete}
        onClick={() => {
          setShow(false);
          setSelectedTicket(null);
        }}
      >
        <div className="grid grid-cols-2 px-2 py-2 mt-2 border border-black p-4">
          <div className="flex w-80 mb-5">
            <h2 className="col-span-2 text-2xl font-semibold">
              {selectedTicket?.nombre}
            </h2>
          </div>

          <p className="col-span-2 font-semibold ">Descripción</p>
          <p className="col-span-2 mb-5 " style={{ fontSize: '14px' }}>{addSpaces(selectedTicket?.descripcion)}</p>

          <p className="font-semibold">Estado</p>
          <p className="font-semibold">Prioridad</p>
          <p className="mb-5">{selectedTicket?.estado}</p>
          <p className="mb-5">{selectedTicket?.prioridad}</p>

          {selectedTicket?.fecha_de_creacion && (
            <div>
              <p className="font-semibold">Fecha de creación</p>
              <p className="mb-5">{selectedTicket.fecha_de_creacion}</p>
            </div>
          )}
          {selectedTicket?.cliente && (
            <div>
              <p className="font-semibold">Cliente</p>
              <p className="mb-5">{buscarNombredeCliente(clientes,selectedTicket.cliente)}</p>
            </div>
          )}
          <div className="flex mb-5">
            <p className="font-semibold mr-2">Asignada a</p>
            <p className="col-span-2">{buscarNombredeRecurso(recursos,selectedTicket?.asignado)}</p>
          </div>
        
          <div className="flex mb-5">
            <p className="font-semibold mr-2">Comentarios:</p>
              <p className="mb-5">{selectedTicket?.comentarios.substring(0,20)}</p>
            <p> </p>
            {/* donde dice asoc deberia ir tareas pero como puse arriba 
            no se como guardar TODAS las atreas en el ;istado de tareas 
            ya que fetch con eltaskId nos trae una a la vez */}
              
          </div>

          <div className="flex mb-5">
              <Link
                  className="bg-sky-500	hover:bg-cyan-600 text-white font-bold py-1 px-4 rounded"
                  href={`/ticket/${selectedTicket?.id_ticket}/allTasks`}
                  //href={`/TicketTask/${selectedTicket?.id_ticket}?producto_id=${selectedTicket?.producto_id}&version_id=${selectedTicket?.version_id}`}
              >
                  Asociar tarea
              </Link>
          </div>
            <div className="flex mb-5">
                <Link
                    className="bg-sky-500	hover:bg-cyan-600 text-white font-bold py-1 px-4 rounded"
                    href={`/ticket/${selectedTicket?.id_ticket}/myTasks`}
                    //href={`/TicketTask/${selectedTicket?.id_ticket}?producto_id=${selectedTicket?.producto_id}&version_id=${selectedTicket?.version_id}`}
                >
                    Ver Tareas Asociadas
                </Link>
            </div>
          
        </div>
        <div className="flex flex-1 justify-between mt-1 items-end gap-8">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
            onClick={() => setWantsToDelete(true)}
          >
            Eliminar
          </button>
          <Link
            className="bg-sky-500	hover:bg-cyan-600 text-white font-bold py-1 px-4 rounded"
            href={`/ticket/${selectedTicket?.id_ticket}?producto_id=${selectedTicket?.producto_id}&version_id=${selectedTicket?.version_id}`}
          >
            Editar
          </Link>
        </div>
      </Modal>
      <Modal
        className={"w-[500px] h-[360px] border border-black p-8"}
        show={wantsToDelete}
        onClick={() => {
          setShow(false);
          setWantsToDelete(false);
          setSelectedTicket(null);
        }}
      >
        <div className="flex flex-col">
          <div className="border border-black p-4 mt-2">
            <p className="font-bold mb-4 mt-4 text-center">
              ¿Está seguro de que desea eliminar el ticket?
            </p>
            <p className="mb-5">
              Esta acción no se puede deshacer y toda la información asociada a
              este ticket se perderá. Por favor, confirme su decisión antes de
              proceder.
            </p>
          </div>
          <div className="flex flex-1 justify-end mt-7 items-end gap-8 items-center">
            <button
              className="bg-red-500	hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
              onClick={() => handleTicketDelete(selectedTicket?.id_ticket)}
            >
              Confirmar
            </button>
            <button
              className="font-bold text-sky-500	hover:text-cyan-600"
              onClick={() => {
                setShow(false);
                setWantsToDelete(false);
                setSelectedTicket(null);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
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
                          onClick={() => location.reload()}
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