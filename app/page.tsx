"use client";

import { useEffect } from "react";
import ScraperInputForm from "./components/ScraperInputForm";
import { useRouter } from "next/navigation";
import { useAppStore } from "./store";

export default function Home() {
  const loggedIn = useAppStore((state) => state.loggedIn);
  const router = useRouter();

  useEffect(() => {
    // if (!loggedIn) {
    //   router.push("/login");
    // }
  }, [loggedIn, router]);

  return (
    <>
      <ScraperInputForm />
    </>
  );
}
