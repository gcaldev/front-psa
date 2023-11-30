import { MANY_PROJECTS } from "@/mocks/proyectos";
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


  const fetchData = (url: string,method = "GET") => {
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