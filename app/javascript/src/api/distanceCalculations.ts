import { RouteData } from "../types";
import axios from 'axios';


export const saveRouteData = async (routeData: RouteData) => {
    const csrfToken = getCsrfToken();
    axios.defaults.headers.common["X-CSRF-Token"] = csrfToken;

    const response = await axios.post('/distance_calculations', routeData);
    return response.data;
};

export const fetchUserAddresses = async (userId: number): Promise<RouteData[]> => {
    const csrfToken = getCsrfToken();
    axios.defaults.headers.common["X-CSRF-Token"] = csrfToken;

    const response = await axios.get(`/users/${userId}/addresses`);
    return response.data;
};

export const fetchAddress = async (id: number): Promise<RouteData> => {
    const csrfToken = getCsrfToken();
    axios.defaults.headers.common["X-CSRF-Token"] = csrfToken;

    const response = await axios.get(`/distance_calculations/${id}`);
    return response.data;
};

export const deleteUserAddress = async (id: number) => {
    const csrfToken = getCsrfToken();
    axios.defaults.headers.common["X-CSRF-Token"] = csrfToken;

    await axios.delete(`/distance_calculations/${id}`);
};

export const updateUserAddress = async (id: number, routeData: RouteData): Promise<RouteData> => {
    const csrfToken = getCsrfToken();
    axios.defaults.headers.common["X-CSRF-Token"] = csrfToken;

    const response = await axios.patch(`/distance_calculations/${id}`, routeData);
    return response.data;
};


//Auth
const getCsrfToken = (): string => {
    const csrfTokenElement = document.querySelector("[name=csrf-token]") as HTMLMetaElement;
    if (!csrfTokenElement) {
        throw new Error('CSRF token not found in document.');
    }
    return csrfTokenElement.content;
};
