import { configApi } from "./configApi";
import axios from "axios";

const { baseUrl, fileExtension, limitFirstHundred } = configApi;

export const fetchHundredNews = async () => {
  const url = baseUrl + "/newstories" + fileExtension + limitFirstHundred;
  const response = await axios.get(url);
  const newsIds = response.data;
  const news = await axios.all(newsIds.map((id) => fetchNewsById(id)));
  return news;
};
export const fetchNewsById = async (id) => {
  const url = baseUrl + "/item/" + id + fileExtension;
  const response = await axios.get(url);
  const data = response.data;
  return data;
};
