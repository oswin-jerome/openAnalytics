import { fetchHelper } from "@/lib/fetchHelper";
import { ApiResponse, Event, PageableResponse, Project } from "@/lib/type";
import { User } from "next-auth";

type SearchQuery = {
  name?: string;
  eventType?: string;
};
export const getEvents = async (proj_id: string, search: SearchQuery) => {
  const res = await fetchHelper(process.env.API_URL + `/projects/${proj_id}/events?name=${search.name}&eventType=${search.eventType}`, {
    method: "get",
  });

  const data: ApiResponse<PageableResponse<Event>> = await res.json();

  return data;
};
