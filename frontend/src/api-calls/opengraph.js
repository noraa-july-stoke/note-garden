import axios from "axios";
export const fetchOpenGraphData = async (url) => {
  try {
    const response = await axios.get("/api/microservices/opengraph-preview", { params: { url } });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
