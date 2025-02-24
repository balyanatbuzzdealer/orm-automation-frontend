"use client";

import { useEffect } from "react";
import ScraperInputForm from "./components/ScraperInputForm";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <ScraperInputForm />
    </>
  );
}
