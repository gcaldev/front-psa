import { ModalProps } from "./types"

export default function Modal({ modalOpen, setModalOpen, list }: ModalProps) {
  return (
    <div
      id="loguearHorasModal"
      tabIndex={-1}
      aria-hidden={!modalOpen}
      className={`${modalOpen ? "" : "hidden"} absolute inset-0 h-screen flex justify-center items-center bg-black/25`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* <!-- Modal header --> */}
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Product</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
              onClick={() => {
                setModalOpen(false)
              }}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <form action="#">
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label htmlFor="usuario" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Usuario
                </label>
                <select
                  id="usuario"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected>Seleccione usuario</option>
                  {list.map((usuario) => (
                    <option value={`${usuario.nombre}-${usuario.apellido}`} key={`${usuario.nombre}-${usuario.apellido}`}>
                      {usuario.nombre} {usuario.apellido}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="horas" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Horas
                </label>
                <input
                  type="number"
                  name="horas"
                  id="horas"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Horas trabajadas"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-sky-500 text-sky-100 hover:bg-sky-600 place-self-end"
              data-modal-toggle="loguearHorasModal"
              id="loguearHorasButton"
              onClick={() => {
                setModalOpen(false)
              }}
            >
              Loguear horas
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
