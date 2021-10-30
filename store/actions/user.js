import Toast from "react-native-toast-message";
import { apiCall } from "../../services/api";
import { setTokenHeader } from "../../services/tokenHeader";
import { setData } from "../../handlers/localStorage";
import jwt_decode from "jwt-decode";

const API = "https://rveuli.magsman.ge";

export const checkUser = (values, callback, setErrors) => {
  return new Promise((resolve, reject) => {
    console.log(values);
    return apiCall("post", `${API}/api/user/login`, values, setErrors)
      .then((res) => {
        setData("secondaryToken", res.token);
        setTokenHeader(res.token);
        var decoded = jwt_decode(res.token);
        callback(true, decoded);
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
};

export const signUp = (data, callback, setErrors) => {
  return new Promise((resolve, reject) => {
    return apiCall("post", `${API}/api/user/register`, data, setErrors)
      .then((res) => {
        setData("secondaryToken", res.token);
        setTokenHeader(res.token);
        callback(true, res);
        resolve();
      })
      .catch((err) => {
        reject();
      });
  });
};

export const fetchUserData = (id, callback) => {
  return new Promise((resolve, reject) => {
    return apiCall("get", `${API}/api/user/details`)
      .then((data) => {
        callback(true, { ...data });

        resolve();
      })
      .catch((err) => {
        reject();
      });
  });
};
