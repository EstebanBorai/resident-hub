import { useState } from 'react';
import axios from 'axios';

import type { AxiosResponse, AxiosRequestConfig } from 'axios';

export interface UseAxiosHook<T> {
  error: Error | null;
  execute(params: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  response: T | null;
  isLoading: boolean;
}

export default function useAxios<T>(): UseAxiosHook<T> {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const execute = async (
    params: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    setLoading(true);

    try {
      const result = await axios.request(params);

      setResponse(result.data);

      return result;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    execute,
    response,
    isLoading,
  };
}
