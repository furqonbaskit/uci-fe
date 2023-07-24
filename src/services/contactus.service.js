import useFetchSwr from "./useFetchSwr";

const API_URL = "/contact";

const GetAll = () => {
    const { data, isDataLoading, refresh } = useFetchSwr(API_URL);
    return {
        data,
        isDataLoading,
        refresh,
    }
}

const ContactService = {
    GetAll
}

export default ContactService;