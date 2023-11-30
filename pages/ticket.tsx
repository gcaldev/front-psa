import TicketLayout from "@/components/TicketLayout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function NewTicketLayout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [version_id, setVersionId] = useState("");
  const [producto_id, setProductId] = useState("");


  useEffect(() => {
    if (router.isReady) {
      setIsLoading(false);
      setVersionId(router.query.version_id as any);
      setProductId(router.query.producto_id as any);

    }
  }, [router.isReady]);

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  return <TicketLayout producto_id={producto_id} version_id={version_id} />;
}
