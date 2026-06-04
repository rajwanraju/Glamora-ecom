'use client';

import { type RootState } from '@store/index';
import { type AppType } from '@store/slices/appSlice';
import ApiService from '@utils/ApiService';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface IUseFetchDataParams {
  endpoint: string;
  isFetchAgain?: boolean;
  isActionOnFetch?: boolean;
  isPagination?: boolean;
  isAvoidGlobalReFetchData?: boolean;
  isAppendData?: boolean;
  appendDataPathName?: string;
  appendDataCheckUniqueKey?: string;
}

export type IUseFetchDataReturn = readonly [
  boolean,
  any,
  string,
  any,
  () => Promise<void>,
  boolean,
  setData: React.Dispatch<React.SetStateAction<any>>,
];

/**
 * A custom hook to manage data fetching with loading, error and re-fetch logic.
 *
 * @param params - The parameters object
 * @param params.endpoint - The API endpoint to fetch data from
 * @param params.isFetchAgain - Whether to fetch data again based on the app's re-fetch flag
 * @param params.isActionOnFetch - If true, the hook will not fetch data on mount
 * @param params.isPagination - If true, the hook will show a loading state for pagination
 * @param params.isAvoidGlobalReFetchData - If true, the hook will not use the global re-fetch flag
 * @param params.isAppendData - If true, the hook will append fetched data to the existing data
 * @param params.appendDataCheckUniqueKey - The key to check if the data is unique
 *
 * @returns An array containing:
 *  - isLoading: boolean, indicating if data is being fetched.
 *  - data: any, the fetched data.
 *  - errorMessage: string, the error message if data fetching fails.
 *  - errorObject: any, the error object if data fetching fails.
 *  - fetchData: () => Promise<void>, a function to fetch data again.
 *  - isLoadingPagination: boolean, indicating if pagination is in progress.
 *  - setData: React.Dispatch<React.SetStateAction<any>>, a function to set the fetched data.
 */
const useFetchData = ({
  endpoint,
  isFetchAgain = false,
  isActionOnFetch = false,
  isPagination = false,
  isAvoidGlobalReFetchData = false,
  isAppendData = false,
  appendDataPathName = 'data',
  appendDataCheckUniqueKey = 'id',
}: IUseFetchDataParams): IUseFetchDataReturn => {
  const { globalReFetchData }: AppType = useSelector((state: RootState) => state.app);
  const [isLoadingPagination, setIsLoadingPagination] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(!isActionOnFetch);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorObject, setErrorObject] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  /**
   * Fetches data from the specified API endpoint and updates the loading state
   * and data accordingly. If an error occurs, it updates the error message and
   * error object.
   *
   * @returns A promise that resolves when data fetching is complete.
   */
  async function fetchData(): Promise<void> {
    try {
      // set the loading state based on the fetch action
      if (isPagination) {
        setIsLoadingPagination(isPagination);
      } else {
        setIsLoading(true);
      }

      // set the error message and error object to null
      setErrorMessage('');
      setErrorObject(null);

      const response: any = await ApiService.get(endpoint);

      if (data && isAppendData) {
        setData((prevState: any) => {
          const newData = response?.result?.[appendDataPathName] ?? [];
          const existingData = prevState?.result?.[appendDataPathName] ?? [];
          const mergedData = [
            ...existingData,
            ...newData.filter(
              (item: any) =>
                !existingData.some(
                  (existingItem: any) =>
                    existingItem?.[appendDataCheckUniqueKey] === item?.[appendDataCheckUniqueKey]
                )
            ),
          ];

          return {
            ...prevState,
            result: {
              [appendDataPathName]: mergedData,
              pagination: response?.result?.pagination ?? prevState?.result?.pagination,
            },
          };
        });
      } else {
        setData(response);
      }
    } catch (error: any) {
      console.error(error);

      setErrorObject(error);
      setErrorMessage(
        error?.response?.data?.message ??
          error?.message ??
          'Something went wrong! Failed to fetch data.'
      );
    } finally {
      setIsLoadingPagination(false);
      setIsLoading(false);
    }
  }

  const fetchDataCallback = useCallback(fetchData, [
    endpoint,
    isFetchAgain,
    isAvoidGlobalReFetchData ? undefined : globalReFetchData,
  ]);

  useEffect(() => {
    if (!isActionOnFetch) {
      void fetchDataCallback();
    }
  }, [fetchDataCallback, isActionOnFetch]);

  return [
    isLoading,
    data,
    errorMessage,
    errorObject,
    fetchData,
    isLoadingPagination,
    setData,
  ] as const;
};

export default useFetchData;
