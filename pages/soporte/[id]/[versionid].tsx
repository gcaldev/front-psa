import {useEffect, useState} from "react";
import Link from "next/link";
import TicketGridRow from "@/components/ticketGridRow"; //traer ticketGrindRow
import { useRouter } from 'next/router';
import { Ticket } from "@/types/types";
import useFetch from "@/hooks/useFetch";


//import TicketCreate from "@/Components/TicketCreate";


const TicketItem = ({
    id_ticket,
    nombre,
    descripcion,
    fecha_de_creacion,
    estado,
    severidad,
    prioridad,
    cliente,
    asignado,   
    //comentarios,
    producto_id,
    version_id,

}: Ticket): JSX.Element => {
    // if (!fechaInicio || !fechaFin) {
    //   // Hay que chequear si deberia poder no establecer fechas
    //   return <></>;
    // }
    return (
        <article
        id={id_ticket}
        className="inline-flex rounded-md bg-zinc-300 border-2 border-zinc-600 px-4 py-2 my-2"
        >
        <div className="flex-1">
            <div className="place-content-start ">
                <p className="m-0 font-bold" >  
                    <span className="font-bold" >Nombre: </span>
                    <span>{nombre}</span>
                </p>
                <p className="m-0" >  
                    <span className="" >Descripción: </span>
                    <span>{descripcion}</span>
                </p>
                <p className="m-0" >  
                    <span>fecha de creación: </span>
                    <span>{fecha_de_creacion}</span>
                </p>
            </div>
        
            <div className="my-2">
                <div className="flex flex-row">
                    <p className="m-0" >  
                        <span className= "font-bold">Estado: </span>
                        <span>{estado}</span>
                    </p>
                    <p className="ml-4" >  
                        <span className= "  font-bold">Asignado </span>
                        <span>{asignado}</span>
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
                    <p className="ml-7" >  
                        <span className= "  font-bold">Cliente </span>
                        <span>{cliente}</span>
                    </p>
                    {/* <p className="ml-5" >  
                        <span className= "font-bold">Comentarios </span>
                        <span>{comentarios}</span>
                    </p>                 */}
                </div>
            </div>
        </div>
        
        <div className="place-self-center flex-2">   
            <p className= "text-align: center p-1 font-bold ">
                <Link
                    className="justify-self-center bg-zinc-50 hover:bg-zinc-100 text-black py-1 px-1"
                    //href={`/soporte/${encodeURIComponent(id_ticket)}`}
                    href={`/ticket/${id_ticket}?producto_id=${producto_id}?version_id=${version_id}`}
                    
                >  
                ver tareas asocidas
                </Link>
            </p>
        </div> 

        <div className="ml-3 self-center flex-3">
          <Link  className=""
            //</div>href={`/soporte/${encodeURIComponent("id_ticket")}`}
            //href={`/ticket/${id_ticket}?producto_id=${producto_id}?version_id=${version_id}?`}
            href={`/ticket/${id_ticket}?version_id=${version_id}&producto_id=${producto_id}`}
            >
          <p className="text-base font-bold uppercase">{"EDITAR"}</p>
          </Link>
        </div> 
        
    </article>
    
    );
  };
  
  export default function Tickets() {
    const [filteredList, setFilteredList] = useState<Ticket[] | null>(null);
    const [searchName, setSearchName] = useState<string>("");
    const router = useRouter();
    const { data, error, loading } = useFetch<Ticket[]>(
    
        //el de render esta vacio NO TRAE NADA
        //EL MYJSON TRAE UN TICKET CON TODOS CAMPOS Q DICEN STRING
        //"https://psa-prueba-2.onrender.com/tickets"
        "https://my-json-server.typicode.com/squad-7-psa-2023-2c/server-squad-7/tickets"
    );
  
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (data) {
        const filteredTickets = data.filter((ticket) =>
          ticket?.nombre?.toLowerCase().includes(searchName?.toLowerCase())
        );
  
        setFilteredList(filteredTickets);
      }
    };
    
    if (loading) {
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
    

    if (error) {
      router.push("/error");
      return;
    }

    const currentList = filteredList ?? data;
      var urlString = window.location.href;
      var url = new URL(urlString);
      var productid = url.pathname.split('/')[2];
      var versionid = url.pathname.split('/')[3];
          
    return (
      <div className="flex-1">
        <h1 className="text-3xl font-bold">Listado De Tickets</h1>
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
          {!currentList || currentList.length < 1 ? (
            <h1 className="self-center">
              No se encontraron tickets con el nombre especificado
            </h1>
          ) : (
            currentList?.map((ticket) => <TicketItem {...ticket} />)
          )
          }
        </div>
      </div>
    );
  }
  


// function HeaderItem({ title }: { title: string }) {
//     return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
// }

// export default function Version() {
//     const [list, setList] = useState([])
//     const router = useRouter();

//     useEffect(() => {
//         if (router.query.id) {
//             // Construye la URL con la ID desde el router
//             const apiUrl = `https://my-json-server.typicode.com/squad-7-psa-2023-2c/server-squad-7/tickets`; // traer nuestra api usando los numeros de la url
//             fetch(apiUrl)
//                 .then((res) => {
//                     return res.json()
//                 })
//                 .then((data) => {
//                     setList(data)
//                 })
//         }
//     }, [])

//     return (
//         <>
//             {/* ACA EMPIEZA LA GRILLA */}

//             <div className="container max-w-7xl mx-auto mt-8">
//                 <div className="mb-4">
//                     <h1 className="text-3xl font-bold decoration-gray-400">Tickets</h1>
//                 </div>
//                 <div className="flex flex-col">
//                     <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
//                         <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
//                             <table className="min-w-full">
//                                 <thead>
//                                 <tr>
//                                     <HeaderItem title="id" />
//                                     <HeaderItem title="Tickets" />
//                                 </tr>
//                                 </thead>

//                                 <tbody>
//                                 {list.map((Ticket) => (
//                                     <TicketGridRow key={Ticket['id_ticket']} Ticket={Ticket} />
//                                 ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
