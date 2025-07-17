import http from "@/services/http";
import { IAbout } from "@/interfaces/about.interface";

export const getAboutMe = () => {
  return http.get<{ data: { about: IAbout } }>("/about");
};

export const updateAboutMe = (data: IAbout) => {
  return http.put<{ data: { about: IAbout } }>("/about", data); // 
};
