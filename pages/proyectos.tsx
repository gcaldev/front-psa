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
  if (!fechaInicio || !fechaFin) {
    // Hay que chequear si deberia poder no establecer fechas
    return <></>;
  }

  return (
    <article
      id={id}
      className="rounded-md	 flex justify-between items-center bg-zinc-300 px-4 py-2 my-2"
    >
      <div className="flex items-center gap-[15px]">
        <p className="text-2xl">📈</p>
        <div className="flex gap-0 flex-col justify-start items-start text-sm font-semibold">
          <p className="m-0">Nombre: {nombre}</p>
          <p className="m-0">
            Fecha inicio y fin: {fechaInicio} - {fechaFin}
          </p>
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
    "https://proyectos-psa-api.free.beeceptor.com/proyectos"
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
