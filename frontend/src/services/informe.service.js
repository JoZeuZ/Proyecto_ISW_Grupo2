import axios from "./root.service";

export const getInformes = async () => {
  try {
    const response = await axios.get("/informe");
    if (response.status === 200) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.log(error);
  }
}

export const deleteInforme = async (id) => {
    try {
        const response = await axios.delete(`/informe/${id}`);
        if (response.status === 200) {
        return response.data.data;
        }
        return [];
    } catch (error) {
        console.log(error);
    }
}