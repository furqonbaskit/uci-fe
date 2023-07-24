import useSingleFetch from './useSingleFetch';

const API_URL = '/policy';

const GetOne = (type, isLoggedIn = true) => {
  try {
    const { data, isDataLoading, isError, refresh } = useSingleFetch(
      API_URL,
      type,
      isLoggedIn
    );
    return {
      data: data?.data,
      isDataLoading: isDataLoading,
      isError: isError,
      refresh: refresh,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const GetPolicy = {
  GetOne,
};
export default GetPolicy;
