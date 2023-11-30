import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import { Tarea } from "@/types/types";
import { PROJECT_MODULE_URL } from "@/env-vars";

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
  const url = `${PROJECT_MODULE_URL}/proyectos/${router.query.id}/tareas`;
  console.log(data);
  useEffect(() => {
    if (router.isReady) {
      fetchData(url);
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
    const deleteUrl = `${PROJECT_MODULE_URL}/tareas/${id}`;
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
        <div className="max-w-screen-xl mx-auto flex h-full flex-col border-b-2">
          <div className="flex justify-between items-end pt-8 border-t-2">
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
              estado={"No Iniciado"}
              estadoLabel={"No Iniciado"}
              onClick={handleTaskSelection}
            />
            <ItemTablero
              tareas={data}
              estado={"En Progreso"}
              estadoLabel={"En Progreso"}
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
          <p className="font-semibold">Prioridad</p>
          <p className="mb-5">{selectedTask?.estado}</p>
          <p className="mb-5">{selectedTask?.prioridad}</p>

          {selectedTask?.fechaInicio && (
            <div>
              <p className="font-semibold">Fecha de inicio</p>
              <p className="mb-5">{selectedTask.fechaInicio}</p>
            </div>
          )}
          {selectedTask?.fechaInicio && (
            <div>
              <p className="font-semibold">Fecha de fin</p>
              <p className="mb-5">{selectedTask.fechaFin}</p>
            </div>
          )}
          <div className="flex mb-5">
            <p className="font-semibold mr-2">Asignada a</p>
            <p className="col-span-2">{selectedTask?.asignado}</p>
          </div>
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
