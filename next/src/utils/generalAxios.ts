import axios, { AxiosError } from "axios";

export async function fetchAPI(
  url: string,
  method: string,
  token: string | null,
  data: object | FormData | null = null,
  params = {}
) {
  try {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    // If the data is an instance of FormData, do not set the Content-Type header
    if (!(data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const options = {
      method: method,
      url: url,
      headers: headers,
      params: params,
      ...(data && { data: data }),
    };

    const response = await axios(options);
    console.log("from axios: " + response);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    // Handle error appropriately
    // Axios wraps the error response in error.response
    if (axiosError.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error response:", axiosError.response);
    } else if (axiosError.request) {
      // The request was made but no response was received
      console.error("No response received:", axiosError.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", axiosError.message);
    }

    throw error; // You can decide how to handle the error and whether to re-throw it
  }
}
