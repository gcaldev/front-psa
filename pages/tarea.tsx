import TaskLayout from "@/components/TaskLayout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function NewTaskLayout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    if (router.isReady) {
      setIsLoading(false);
      setProjectId(router.query.project_id as any);
    }
  }, [router.isReady]);

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  return <TaskLayout project_id={projectId} />;
}
