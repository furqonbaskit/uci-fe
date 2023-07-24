import { axiosInstance } from './axiosInstance';
import useSWR from 'swr';
import qs from 'qs';
import authHeader from './auth.header';

const getAxios = ({ url, size, page, isLoggedIn }) => {
  const qsp = qs.stringify(
    {
      size,
      page,
    },
    { skipNulls: true }
  );
  const get = axiosInstance
    .get(`${url}?${qsp}`, { headers: isLoggedIn ? authHeader() : null })
    .then((resp) => resp.data)
    .catch((error) => console.log({ error }));

  return get;
};

const useFetchSwr = (url, size = 5, page = 0, isLoggedIn = false) => {
  const response = useSWR({ url, size, page, isLoggedIn }, getAxios, {
    revalidateOnMount: true,
  });

  return {
    data: response.data,
    isDataLoading: !response.error && !response.data,
    isError: response.error,
    refresh: response.mutate,
  };
};

export default useFetchSwr;
