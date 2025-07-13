/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FetchState } from "@/interfaces/fetch.interface";
import http from "@/services/http";
import { useEffect, useState } from "react";

export function useFetch<T>(endpoint: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await http.get(endpoint);
        if (isMounted) {
          setState({ data: res.data, loading: false, error: null });
        }
      } catch (error: any) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: error?.response?.data?.message || error.message,
          });
        }
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);
  return state;
}
