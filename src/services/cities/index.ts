import http from "../api";
import { APIResponse } from "../types";
import { City, InputCreateCity, InputUpdateCity } from "./types";

async function getCities() {
  return await http.get<APIResponse<City[]>>("City");
}

async function deleteCity(id: number) {
  return await http.delete<APIResponse<boolean>>(`City/${id}`);
}

async function createCity(input: InputCreateCity) {
  return await http.post<APIResponse<City>>("City", input);
}

async function updateCity(input: InputUpdateCity) {
  return await http.put<APIResponse<boolean>>("City", input);
}

export default {
  getCities,
  createCity,
  updateCity,
  deleteCity,
};