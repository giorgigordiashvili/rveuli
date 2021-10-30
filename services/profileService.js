import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/update-user";

export function updateUser(data) {
  return http.post(apiEndpoint, data);
}

export function changePassword(data) {
  return http.post(apiUrl + "/change-password/" + data.user_id, data);
}

export function getDamxmareebi() {
  console.log(apiUrl + "/damxmareebi");
  return http.get(apiUrl + "/damxmareebi");
}
