import TastTicketLayout from "@/components/TastTicketLayout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function UpdateTaskTicketLayout() {
    
    const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [params, setParams] = useState({
    id_ticket: "",
    version_id: "",
    producto_id:"",
  });
  useEffect(() => {
    if (router.isReady) {
      console.log(router.query, "router.query");
      setIsLoading(false);
      setParams({
        id_ticket: router.query.id as string,
        version_id: router.query.version_id as string,
        producto_id: router.query.producto_id as string,
    
      });
    }
    //console.log("ticket id: ",router.query.id)
  }, [router.isReady]);

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  return <TastTicketLayout {...params} />;
}
