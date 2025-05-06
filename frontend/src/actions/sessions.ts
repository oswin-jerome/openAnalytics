import { fetchHelper } from "@/lib/fetchHelper";
import { ApiResponse, Event, PageableResponse, Project, Session } from "@/lib/type";
import { User } from "next-auth";

export const getSessions = async (proj_id: string) => {
  const res = await fetchHelper(process.env.API_URL + `/projects/${proj_id}/sessions`, {
    method: "get",
  });

  const data: ApiResponse<PageableResponse<Session>> = await res.json();

  return data;
};
