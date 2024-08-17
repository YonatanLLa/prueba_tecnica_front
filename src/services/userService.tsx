import axios from "axios";

export const getUserData = async () => {
  try {
    const response = await axios.get("https://localhost:7113/api/Person");

    return response.data;
  } catch (error) {
    console.log("Error in getUser: ", error);
    throw error;
  }
};

export const getByIdUserData = async (id: number) => {
  console.log(id, "id");

  try {
    const response = await axios.get(`https://localhost:7113/api/Person/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error in getByIdUser: ", error);
    throw error;
  }
};

export const deleteUserData = async (id: number) => {
  try {
    const response = await axios.delete(
      `https://localhost:7113/api/Person/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Error in deleteData: ", error);
    throw error;
  }
};
