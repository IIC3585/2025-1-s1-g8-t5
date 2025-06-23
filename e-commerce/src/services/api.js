import axios from "axios";

const api = axios.create({
    baseURL: "https://fakestoreapi.com",
})

api.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      console.error("Network error:", error.message);
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    switch (status) {
      case 401:
        console.warn("No autorizado", data);
        break;
      case 404:
        console.info("Recurso no encontrado");
        break;
      default:
        console.error("Error desconocido", data);
    }
    return Promise.reject(error);
  }
);

// La respuesta es un array de productos, no un objeto
const query = api.get('/products');
query.then(response => console.log(response.data));