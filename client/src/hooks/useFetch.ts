/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import http from "@/services/http";

export function useFetch<T>(endpoint: string, dataPath?: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await http.get(endpoint);
      let fetchedData: any = res.data;
      if (dataPath) {
        const parts = dataPath.split(".");
        for (const part of parts) {
          fetchedData = fetchedData?.[part];
        }
      }
      setData(fetchedData);
      setError(null);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [endpoint, dataPath]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
