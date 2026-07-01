"use server";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { cookies } from "next/headers";

export async function logoutUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("token").value;
  const { data } = await axiosInstance.post("auth/logout",{}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  cookieStore.delete("token");
  return data;
}
