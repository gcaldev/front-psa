import { MANY_PROJECTS } from "@/mocks/projects";
import { useEffect, useState } from "react";

type IDataFetching<T> = {
    data: T | null;
    loading: boolean;
    error: any
}

/**
 * Hook encargado de realizar las peticiones y facilitar la información devuelta
 */
const useFetch = <T>(url: string,method = "GET"): IDataFetching<T> => {
    const [dataState, setDataState] = useState<IDataFetching<T>>({
      data: null,
      loading: true,
      error: null
  });

  useEffect(()=> {
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
    })))
  },[]);

  return dataState
}

export default useFetch;