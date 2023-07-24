import { axiosInstance } from './axiosInstance';
import useSWR from 'swr';
import qs from 'qs';
import authHeader from './auth.header';

const getAxios = ({ url, type, isLoggedIn }) => {
  const qsp = qs.stringify(
    {
      type,
    },
    { skipNulls: true }
  );
  const get = axiosInstance
    .get(`${url}?${qsp}`, { headers: isLoggedIn ? authHeader() : null })
    .then((resp) => resp.data)
    .catch((error) => console.log({ error }));

  return get;
};

const useSingleFetch = (url, type, isLoggedIn = false) => {
  const response = useSWR({ url, type, isLoggedIn }, getAxios, {
    revalidateOnMount: true,
  });

  return {
    data: response.data,
    isDataLoading: !response.error && !response.data,
    isError: response.error,
    refresh: response.mutate,
  };
};

export default useSingleFetch;
