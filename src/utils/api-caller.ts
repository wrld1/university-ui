import isNil from "lodash/isNil";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from "axios";

type ExpandedAxiosRequestConfig = AxiosRequestConfig & {
  tokenObj?: any;
  path?: string;
  token?: string;
  onError?: any;
};

const getToken = () => {
  return localStorage.getItem("accessToken");
};

export const apiCaller = async (
  opts: ExpandedAxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  const { url = null, method = "GET", params = {}, data = null } = opts;
  const headers: RawAxiosRequestHeaders = {};

  headers["Content-Type"] = "application/json";

  const token = getToken();

  if (!isNil(token)) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const requestURL = `http://localhost:3010${url}`;

  const config = {
    url: requestURL,
    method,
    data,
    headers,
    params,
  };

  const axiosApiInstance = axios.create(config);

  return axiosApiInstance.request(config);
};
