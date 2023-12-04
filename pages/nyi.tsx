import Link from "next/link";

export default function Error() {
  return (
    <div className="flex h-full flex-col justify-center items-center bg-white">
        <img src="nyi.jpg" alt="Error" style={{ width: '50%', height: 'auto' }} />
      <h1 className="text-4xl mb-5 font-bold">
        Este módulo se encuentra en desarrollo
      </h1>
        <h1 className="text-3xl mb-5 font-bold">
            Le informaremos cuando esté disponible
        </h1>
      <Link
        className="bg-sky-500	hover:bg-cyan-600 text-white font-bold py-1 px-4 rounded"
        href="/"
      >
        Volver a inicio
      </Link>
      <span className="text-7xl"></span>
    </div>
  );
}
