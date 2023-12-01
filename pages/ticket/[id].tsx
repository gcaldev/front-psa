import TicketLayout from "@/components/TicketLayout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function UpdateTicketLayout() {
    
    const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [params, setParams] = useState({
    id_ticket: "",
    producto_id:"",
    version_id: "",
  });
  useEffect(() => {
    if (router.isReady) {
      console.log(router.query, "router.query");
      setIsLoading(false);
      setParams({
        id_ticket: router.query.id as string,
        producto_id: router.query.producto_id as string,
        version_id: router.query.version_id as string,


      });
    }
  }, [router.isReady]);

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  return <TicketLayout {...params} />;
}
