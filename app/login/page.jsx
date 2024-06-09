"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

// rtk slice
import { useGetUserQuery } from "@/features/auth/authSlice";

export default function Login() {
  const router = useRouter();

  // RTK Query
  const { isError, data: session, isFetching, refetch } = useGetUserQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!email || !password) {
      window.alert("Please provide your email and password");
      return;
    }

    try {
      const { error, data } = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (error) {
        return window.alert(error);
      }

      refetch();
      router.push("/dashboard");
    } catch (error) {
      window.alert(error.message);
    } finally {
    }
  };

  // if (isAuthenticated) {
  //   router.push("/dashboard");
  // }

  return (
    <form onSubmit={handleSubmit}>
      <br />
      Email:{" "}
      <input
        type="text"
        className="border border-gray-600"
        defaultValue="john@example.com"
      />{" "}
      <br />
      Password:{" "}
      <input
        type="password"
        className="border border-gray-600"
        defaultValue="1234"
      />{" "}
      <br /> <br />
      <input type="submit" value="Login" />
    </form>
  );
}
