import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import { Proyecto } from "@/types/types";

const ProjectItem = ({
  id,
  lider,
  estado,
  fechaInicio,
  fechaFin,
  nombre,
}: Proyecto): JSX.Element => {
  const getPresentDates = () => {
    if (fechaInicio && fechaFin) {
      return (
        <p className="m-0">
          Fecha inicio y fin: {fechaInicio} - {fechaFin}
        </p>
      );
    }
    return (
      <>
        {fechaInicio && <p className="m-0">Fecha inicio: {fechaInicio}</p>}
        {fechaFin && <p className="m-0">Fecha fin: {fechaFin}</p>}
      </>
    );
  };

  return (
    <article
      id={id}
      className="rounded-md	 flex justify-between items-center bg-zinc-300 px-4 py-2 my-2"
    >
      <div className="flex items-center gap-[15px]">
        <p className="text-2xl">📈</p>
        <div className="flex gap-0 flex-col justify-start items-start text-sm font-semibold">
          <p className="m-0">Nombre: {nombre}</p>
          {getPresentDates()}
          <p className="m-0">Lider: {lider}</p>
        </div>
      </div>
      <div className="flex gap-[20px] items-center">
        <p className="text-base font-bold uppercase">{estado}</p>
        <button></button>
        <Link
          className="bg-zinc-50	hover:bg-zinc-200 text-black font-bold py-1 px-4"
          href={`/proyecto/${encodeURIComponent(id)}`}
        >
          Ver Proyecto
        </Link>
      </div>
    </article>
  );
};

export default function Projects() {
  const [filteredList, setFilteredList] = useState<Proyecto[] | null>(null);
  const [searchName, setSearchName] = useState<string>("");
  const router = useRouter();
  const { data, error, loading } = useFetch<Proyecto[]>(
    "https://my-json-server.typicode.com/gcaldev/psa-mock/proyectos"
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
    return(
        <div class="text-center py-40">
            <div role="status">
                <svg aria-hidden="true" class="inline w-22 h-22 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
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

  return (
    <div className="flex-1">
      <h1 className="text-3xl font-bold">Listado De Proyectos</h1>
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
          Crear proyecto ✚
        </Link>
      </div>
      <div className="mt-8 flex flex-col justify-center">
        {!currentList || currentList.length < 1 ? (
          <h1 className="self-center">
            No se encontraron proyectos con el nombre especificado
          </h1>
        ) : (
          currentList?.map((project) => <ProjectItem {...project} />)
        )}
      </div>
    </div>
  );
}
