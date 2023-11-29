import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import { Tarea } from "@/types/types";

type PreviewTareaType = {
  estado: string;
  fechaInicio: string;
  prioridad: string;
  asignado: string;
  titulo: string;
  id: string;
};

type ItemTableroType = {
  tareas: PreviewTareaType[];
  estado: string;
  estadoLabel: string;
};

const Tarea = ({
  fechaInicio,
  prioridad,
  asignado,
  titulo,
  id,
  onClick,
}: PreviewTareaType & { onClick?: any }): JSX.Element => {
  const diasDesdeInicio = (fechaInicio: string): string => {
    const fechaPasada = new Date(fechaInicio).getTime();
    const fechaActual = new Date().getTime();

    const milisegundosPasados = fechaActual - fechaPasada;

    const diasPasados = Math.floor(milisegundosPasados / (1000 * 60 * 60 * 24));

    return `${diasPasados}d`;
  };

  return (
    <article
      className="flex flex-col p-4 bg-white	 rounded-xl m-8 c h-[150px] w-[250px] cursor-pointer"
      id={id}
      onClick={() => onClick(id)}
    >
      <p className="font-bold">{titulo}</p>
      <p>Prioridad: {prioridad}</p>
      <div className="flex flex-1 items-end justify-between">
        <p>{asignado}</p>
        <p className="font-semibold">
          {fechaInicio && diasDesdeInicio(fechaInicio)}
        </p>
      </div>
    </article>
  );
};

//flex flex-col bg-zinc-300 items-center rounded-lg
const ItemTablero = ({
  tareas,
  estado,
  estadoLabel,
  onClick,
}: ItemTableroType & { onClick?: any }): JSX.Element => {
  const filteredTasks = tareas.filter((task) => task.estado === estado);

  return (
    <div className="col-span-1 flex flex-col bg-zinc-300 items-center rounded-lg">
      <p className="text-xl font-bold m-4">{estadoLabel}</p>
      <div>
        {filteredTasks.map((task) => (
          <Tarea {...task} onClick={onClick} />
        ))}
      </div>
    </div>
  );
};

export default function TableroLayout() {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [wantsToDelete, setWantsToDelete] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Tarea | null>(null);
  const { data, error, loading, fetchData } = useFetch<Tarea[]>();
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const url = `https://my-json-server.typicode.com/gcaldev/psa-mock/proyectos/${router.query.id}/tareas`;
  console.log(data);
  useEffect(() => {
    if (router.isReady) {
      fetchData(url);
    }
  }, [router.isReady]);

  if (loading || deleteLoading) {
    return <h1>Cargando...</h1>;
  }

  if (error) {
    router.push("/error");
    return;
  }
  if (!data) return;

  const handleTaskSelection = (id: string): void => {
    setShow(!show);
    const taskToOpen = data.find((task) => task.id === id);
    if (!taskToOpen) {
      return;
    }
    setSelectedTask(taskToOpen);
  };

  const handleTaskDelete = async (id?: string) => {
    const closeModal = () => {
      setShow(false);
      setWantsToDelete(false);
      setSelectedTask(null);
    };

    if (id) {
      deleteTask(id, closeModal);
    } else {
      closeModal();
    }
  };

  const deleteTask = (id: string, onSuccess?: Function) => {
    const deleteUrl = `https://my-json-server.typicode.com/gcaldev/psa-mock/tareas/${id}`;
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
        fetchData();
        onSuccess?.();
      })
      .catch((err) => router.push("/error"));
  };

  return (
    <div className="w-screen h-full">
      <div className="w-screen p-4 h-full">
        <div className="max-w-screen-xl mx-auto flex h-full flex-col">
          <div className="flex justify-between items-end pt-8">
            <h1 className="text-3xl font-bold">Tablero</h1>
            <Link
              className="bg-sky-500	hover:bg-cyan-600 text-white font-bold py-1 px-4 rounded"
              href={`/tarea?project_id=${router.query.id}`}
            >
              Crear tarea ✚
            </Link>
          </div>
          <div className="flex-1 grid grid-cols-4 gap-8 my-8 bg-zinc-100 gap-8">
            <ItemTablero
              tareas={data}
              estado={"Sin Comenzar"}
              estadoLabel={"Sin comenzar"}
              onClick={handleTaskSelection}
            />
            <ItemTablero
              tareas={data}
              estado={"En Progreso"}
              estadoLabel={"En progreso"}
              onClick={handleTaskSelection}
            />
            <ItemTablero
              tareas={data}
              estado={"Finalizado"}
              estadoLabel={"Finalizado"}
              onClick={handleTaskSelection}
            />
            <ItemTablero
              tareas={data}
              estado={"Bloqueado"}
              estadoLabel={"Bloqueado"}
              onClick={handleTaskSelection}
            />
          </div>
        </div>
      </div>
      <Modal
        className={"h-[500px] w-[500px]"}
        show={show && !wantsToDelete}
        onClick={() => {
          setShow(false);
          setSelectedTask(null);
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <h2 className="col-span-2">Titulo: {selectedTask?.titulo}</h2>
          <p className="col-span-2">Descripcion: {selectedTask?.descripcion}</p>
          <p>Estado: {selectedTask?.estado}</p>
          <p>Prioridad: {selectedTask?.prioridad}</p>
          {selectedTask?.fechaInicio && (
            <p>Fecha de inicio: {selectedTask.fechaInicio}</p>
          )}
          {selectedTask?.fechaInicio && (
            <p>Fecha de fin: {selectedTask.fechaFin}</p>
          )}
          <p className="col-span-2">Asignado: {selectedTask?.asignado}</p>
        </div>
        <div className="flex flex-1 justify-end items-end gap-8">
          <button
            className="bg-red-500	hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
            onClick={() => setWantsToDelete(true)}
          >
            Eliminar
          </button>
          <Link
            className="bg-sky-500	hover:bg-cyan-600 text-white font-bold py-1 px-4 rounded"
            href={`/tarea/${encodeURIComponent(
              selectedTask?.id ?? ""
            )}?project_id=${selectedTask?.project_id}`}
          >
            Editar
          </Link>
        </div>
      </Modal>
      <Modal
        className={"w-[500px] h-[300px]"}
        show={wantsToDelete}
        onClick={() => {
          setShow(false);
          setWantsToDelete(false);
          setSelectedTask(null);
        }}
      >
        <div className="flex flex-col">
          <p className="font-bold mb-4 mt-4 text-center">
            ¿Está seguro de que desea eliminar la tarea seleccionada?
          </p>
          <p>
            Esta acción no se puede deshacer y toda la información asociada a
            esta tarea se perderá. Por favor, confirme su decisión antes de
            proceder.
          </p>
          <div className="flex flex-1 justify-end mt-12 items-end gap-8 items-center">
            <button
              className="bg-red-500	hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
              onClick={() => handleTaskDelete(selectedTask?.id)}
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
