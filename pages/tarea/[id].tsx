import TaskLayout from "@/components/TaskLayout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function UpdateTaskLayout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [params, setParams] = useState({
    id: "",
    project_id: "",
  });
  useEffect(() => {
    if (router.isReady) {
      console.log(router.query, "router.query");
      setIsLoading(false);
      setParams({
        id: router.query.id as string,
        project_id: router.query.project_id as string,
      });
    }
  }, [router.isReady]);

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  return <TaskLayout {...params} />;
}
