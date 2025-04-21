"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("user_id");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", userId);
      router.push("/"); // Redirect to homepage or dashboard
    }
  }, [token, userId, router]);

  return <p className="text-center mt-20 text-gray-600">Signing you in…</p>;
}
