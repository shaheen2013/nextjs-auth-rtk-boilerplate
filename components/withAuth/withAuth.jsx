import React from "react";
import { useRouter } from "next/navigation";

// RTK SLICES
import { useGetUserQuery } from "@/features/auth/authSlice";

function withAuth(WrappedComponent, options = {}) {
  return function AuthComponent(props) {
    const router = useRouter();

    // RTK QUERY
    const { isError, data, isFetching, refetch, error } = useGetUserQuery();

    // console.log(" data ", data?.user);

    // if loading is true, show loader
    if (isFetching) {
      return "Loading...";
    }

    // if any query fails, show try again
    if (isError) {
      return "Error...";
    }

    // redirect if user isn't logged in
    if (!data?.user) {
      router.push("/login?next=/dashboard");
    }

    // default fallback
    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
