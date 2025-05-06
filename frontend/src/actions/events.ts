import { fetchHelper } from "@/lib/fetchHelper";
import { ApiResponse, Event, Project } from "@/lib/type";
import { User } from "next-auth";

export const getEvents = async (proj_id: string) => {
  const res = await fetchHelper(process.env.API_URL + `/projects/${proj_id}/events`, {
    method: "get",
  });

  const data: ApiResponse<Event[]> = await res.json();

  return data;
};
