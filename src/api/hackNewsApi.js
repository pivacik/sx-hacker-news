import { configApi } from "./configApi";
import axios from "axios";

const { baseUrl, fileExtension, limitFirstHundred } = configApi;

export const fetchHundredNews = async () => {
  const url = baseUrl + "/newstories" + fileExtension + limitFirstHundred;
  const response = await axios.get(url);
  const newsIds = response.data;
  const news = await axios.all(newsIds.map((id) => fetchStoryById(id)));
  return news;
};
export const fetchStoryById = async (id) => {
  const url = baseUrl + "/item/" + id + fileExtension;
  try {
    const response = await axios.get(url);
    if (response.data === null) {
      return Promise.reject({ status: "failed" });
    }
    return response.data;
  } catch (err) {
    return err;
  }
};
