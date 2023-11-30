import TicketLayout from "@/components/TicketLayout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function NewTaskLayout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [version_id, setProjectId] = useState("");

  useEffect(() => {
    if (router.isReady) {
      setIsLoading(false);
      setProjectId(router.query.version_id as any);
    }
  }, [router.isReady]);

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  return <TicketLayout version_id={version_id} />;
}
