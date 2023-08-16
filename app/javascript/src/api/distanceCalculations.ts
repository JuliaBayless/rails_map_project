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


//Auth
const getCsrfToken = (): string => {
    const csrfTokenElement = document.querySelector("[name=csrf-token]") as HTMLMetaElement;
    if (!csrfTokenElement) {
        throw new Error('CSRF token not found in document.');
    }
    return csrfTokenElement.content;
};
