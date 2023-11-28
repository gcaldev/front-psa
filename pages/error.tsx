export default function Error() {
  return (
    <div className="flex h-full flex-col justify-center items-center bg-white">
      <img
        src="error.jpg"
        alt="Error"
      />
      <h1 className="text-4xl mb-5 font-bold">
        Hubo un error al realizar la operación
      </h1>
      <span className="text-7xl"></span>
    </div>
  );
}
