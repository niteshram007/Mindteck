"use server";
import { cookies } from "next/headers";

export async function loginUser(formData) {
  const result = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "public/auth/login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(formData),
  });
  const data = await result.json();
  if (!result.ok) {
    throw new Error(data?.message || "Login failed");
  }

  const { token } = data;
  if (token) {
    // Set token in cookies
    cookies().set("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
  }
  return data;
}
