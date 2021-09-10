import { configApi } from "./configApi";
import axios from "axios";

const { baseUrl, fileExtension, limitFirstHundred } = configApi;

export const fetchHundredNews = async () => {
  const url = baseUrl + "/newstories" + fileExtension + limitFirstHundred;
  const response = await axios.get(url);
  const newsIds = response.data;
  const news = await axios.all(newsIds.map((id) => fetchItemById(id)));
  return news;
};

export const fetchItemById = async (id) => {
  const url = baseUrl + "/item/" + id + fileExtension;
  try {
    const response = await axios.get(url);
    console.log(response);
    if (response.data === null) {
      return null;
    }
    return response.data;
  } catch (err) {
    return err;
  }
};

export const fetchComments = async (idList) => {
  const comments = await axios.all(idList.map((id) => fetchItemById(id)));
  return comments;
};
