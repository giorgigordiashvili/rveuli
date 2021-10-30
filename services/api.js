import axios from "axios";

export function apiCall(method, path, data, setErrors) {
  return new Promise((resolve, reject) => {
    return axios[method.toLowerCase()](path, data)
      .then((res) => {
        return resolve(res.data);
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
        return reject(err.response.data.error);
      });
  });
}
