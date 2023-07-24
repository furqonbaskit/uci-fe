import authHeader from './auth.header';
import { axiosInstance } from './axiosInstance';
import useFetchSwr from './useFetchSwr';
import useSingleFetch from './useSingleFetch';

const API_URL = '/news';

const GetAll = (size = 10, page = 1) => {
  const { data, isDataLoading, refresh } = useFetchSwr(
    API_URL,
    size,
    page - 1,
    true
  );
  return {
    data: data?.result?.rows,
    currentPage: data?.result?.currentPage,
    totalItems: data?.result?.totalItems,
    totalPages: data?.result?.totalPages,
    isDataLoading,
    refresh,
  };
};

const GetAllTag = (size = 10, page = 1) => {
  const { data, isDataLoading, refresh } = useFetchSwr(
    `${API_URL}/tag`,
    size,
    page - 1,
    true
  );
  return {
    data: data?.result?.rows,
    currentPage: data?.result?.currentPage,
    totalItems: data?.result?.totalItems,
    totalPages: data?.result?.totalPages,
    isDataLoading,
    refresh,
  };
};

const CreateTag = async (body) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/tag`, body, {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    return error?.response?.data;
  }
};

const GetOneTag = (id) => {
  try {
    const { data, isDataLoading, isError, refresh } = useSingleFetch(
      `${API_URL}/tag/${id}`,
      null,
      true
    );
    return {
      data: data?.result,
      isDataLoading: isDataLoading,
      isError: isError,
      refresh: refresh,
    };
  } catch (error) {
    throw new Error(error);
  }
}

const EditTag = async (id, body) => {
  try {
    const response = await axiosInstance.patch(`${API_URL}/tag/${id}`, body, {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    return error?.response?.data;
  }
};

const DeleteTag = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/tag/${id}`, {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    return error?.response?.data;
  }
};

const CreateNews = async (body) => {
  try {
    const response = await axiosInstance.post(`${API_URL}`, body, {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    return error?.response?.data;
  }
};

const NewsService = {
  GetAll,
  GetAllTag,
  CreateTag,
  GetOneTag,
  EditTag,
  DeleteTag,
  CreateNews,
};

export default NewsService;
