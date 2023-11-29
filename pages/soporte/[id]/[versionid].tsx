import {useEffect, useState} from "react";
import Link from "next/link";
import TicketGridRow from "@/components/ticketGridRow"; //traer ticketGrindRow
import { useRouter } from 'next/router';
import { Ticket } from "@/types/types";
import useFetch from "@/hooks/useFetch";



const ProjectItem = ({
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
                    <p className="ml-5" >  
                        <span className= "font-bold">Comentarios </span>
                        <span>{comentarios}</span>
                    </p>                
                </div>
            </div>
        </div>
        
        <div className="place-self-center flex-2">   
            <p className= "text-align: center p-1 font-bold ">
                <Link
                    className="justify-self-center bg-zinc-50 hover:bg-zinc-100 text-black py-1 px-1"
                    href={`/soporte/${encodeURIComponent(id_ticket)}`}
                >  
                ver tareas asocidas
                </Link>
            </p>
        </div> 

        <div className="ml-3 self-center flex-3">
          <Link  className=""
            href={`/soporte/${encodeURIComponent("id_ticket")}`}
            >
          <p className="text-base font-bold uppercase">{"EDITAR"}</p>
          </Link>
        </div> 
        
    </article>
    
    );
  };
  
  export default function Projects() {
    const [filteredList, setFilteredList] = useState<Ticket[] | null>(null);
    const [searchName, setSearchName] = useState<string>("");
    const router = useRouter();
    const { data, error, loading } = useFetch<Ticket[]>(
      "https://my-json-server.typicode.com/squad-7-psa-2023-2c/server-squad-7/tickets"
    );
  
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (data) {
        const filteredProjects = data.filter((project) =>
          project?.nombre?.toLowerCase().includes(searchName?.toLowerCase())
        );
  
        setFilteredList(filteredProjects);
      }
    };
  
    if (loading) {
      return <h1>Cargando...</h1>;
    }
  
    if (error) {
      router.push("/error");
      return;
    }
    const currentList = filteredList ?? data;
  
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
            href="/proyecto"
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
            currentList?.map((project) => <ProjectItem {...project} />)
          )}
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
