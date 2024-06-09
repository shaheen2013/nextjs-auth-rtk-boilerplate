"use client";

import React from "react";
import withAuth from "@/components/withAuth/withAuth";
import { signOut } from "next-auth/react";

function Dashboard() {
  const handleLogout = async () => {
    await signOut();
    // router.push("/login");
  };

  return (
    <>
      Protected Dashboard <br />
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default withAuth(Dashboard);
