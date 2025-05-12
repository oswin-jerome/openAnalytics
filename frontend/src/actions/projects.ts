"use server";

import { fetchHelper } from "@/lib/fetchHelper";
import { ApiResponse, Project } from "@/lib/type";
import { User } from "next-auth";

export const getProjects = async () => {
  const res = await fetchHelper(process.env.API_URL + "/projects", {
    method: "get",
  });

  const data: ApiResponse<Project[]> = await res.json();

  return data;
};

export const getProject = async (proj_id: string, duration = "24hrs") => {
  const res = await fetchHelper(process.env.API_URL + `/projects/${proj_id}?duration=${duration}`, {
    method: "get",
  });

  const data: ApiResponse<Project> = await res.json();

  return data;
};

export const createProject = async (name: string, domain: string) => {
  const res = await fetchHelper(process.env.API_URL + `/projects`, {
    method: "POST",
    body: JSON.stringify({
      name,
      domain,
    }),
  });

  const data: ApiResponse<Project> = await res.json();

  return data;
};
