import React from "react";
import SuccessLayout from "@/components/SuccessLayout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function SuccessTaskUpdate() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [id, setId] = useState("");

  useEffect(() => {
    if (router.isReady) {
      setIsLoading(false);
      setId(router.query.id as string);
    }
  }, [router.isReady]);

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <SuccessLayout
      successMessage="Tarea actualizada exitosamente"
      primaryText="Ver tablero"
      primaryLink={`/tablero/${id}`}
      secondaryLink={`/proyecto/${id}`}
      secondaryText="Volver a proyecto"
    />
  );
}
