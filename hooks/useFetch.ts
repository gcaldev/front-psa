import { MANY_PROJECTS, MANY_TASKS } from "@/mocks/projects";
import { useEffect, useState } from "react";

type IDataState<T> = {
    data: T | null;
    loading: boolean;
    error: any;
}

type IDataFetching<T> = IDataState<T> & { fetchData: Function };

/**
 * Hook encargado de realizar las peticiones y facilitar la información devuelta
 */
const useFetch = <T>(url?: string,method = "GET",initial = true): IDataFetching<T> => {
    const [dataState, setDataState] = useState<IDataState<T>>({
      data: null,
      loading: true,
      error: null,
  });


  useEffect(()=> {
    if(initial && url){
      fetchData(url,method);
    }
  },[]);

  const fetchData = (url: string, method = "GET") => {
    console.log(url,method)
    setTimeout(() => {
      console.log("Simulando llamada a la API con retardo de 1 segundo");
      Promise.resolve(MANY_TASKS).then(
        (res) => setDataState({ data: res as any, loading: false, error: null }),
        (err) => setDataState({ data: null, loading: false, error: err })
      );
    }, 1000);    
  }

  const fetchDataa = (url: string,method = "GET") => {
    const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };
    setDataState({
        data: null,
        loading: true,
        error: null
    })
    
    fetch(url,options)
    .then( res => res.json())
    .then((res) => setDataState({
        data: res,
        loading: false,
        error: null
    }))
    .catch((err =>setDataState({
        data: null,
        loading: false,
        error: err
    })));
  }
  
  return {...dataState,fetchData}
}


export default useFetch;