"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Hero from "./Hero";

export default function HeroWithLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timeout);
  }, []);

  return isLoading ? <LoadingSpinner /> : <Hero />;
}
