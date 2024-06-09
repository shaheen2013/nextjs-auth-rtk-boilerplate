import React from "react";
import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <Link href="/">Home(Public)</Link>
      <Link href="/dashboard">Dashboard(protected)</Link>
    </nav>
  );
}
