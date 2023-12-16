import axios from "./root.service.js";

export const getFondos = async () => {
  try {
    const response = await axios.get("/fondo");
    if (response.status == 200){
        return response.data.data;
    }
    return [];
  } catch (error) {
    console.error(error);
  }
};

export const createFondo = async (fondo) => {
  try {
    const response = await axios.post("/fondo", fondo);
    if (response.status == 201){
        return response.data.data;
    }
    return [];
  } catch (error) {
    console.error(error);
  }
};

export const updateFondo = async (fondo) => {
  try {
    const response = await axios.put("/fondo", fondo);
    if (response.status == 200){
        return response.data.data;
    }
    return [];
  } catch (error) {
    console.error(error);
  }
};

export const deleteFondo = async (id) => {
  try {
    const response = await axios.delete(`/fondo/${id}`);
    if (response.status == 200){
        return response.data.data;
    }
    return [];
  } catch (error) {
    console.error(error);
  }
};

export const getFondo = async (id) => {
  try {
    const response = await axios.get(`/fondo/${id}`);
    if (response.status == 200){
        return response.data.data;
    }
    return [];
  } catch (error) {
    console.error(error);
  }
};