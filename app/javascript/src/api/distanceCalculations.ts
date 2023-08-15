import { RouteData } from "../types";
import axios from 'axios';


export const saveRouteData = async (routeData: RouteData) => {
    const csrfTokenElement = document.querySelector("[name=csrf-token]") as HTMLMetaElement;
    if (!csrfTokenElement) {
        throw new Error('CSRF token not found in document.');
    }
    
    const csrfToken = csrfTokenElement.content;
    axios.defaults.headers.common["X-CSRF-Token"] = csrfToken;

    const response = await axios.post('/distance_calculations', routeData);
    return response.data;
};

  