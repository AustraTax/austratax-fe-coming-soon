"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { confirmEmail } from "@/lib/api";

export default function ConfirmPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [status, setStatus] = useState(token ? "loading" : "notice");
  const [message, setMessage] = useState("");

  // Prevent access without token or email
  useEffect(() => {
    if (!token && !email) {
      router.replace("/");
    }
  }, [token, email, router]);

  // Confirm email if token is present
  useEffect(() => {
    const confirm = async () => {
      if (!token) return;

      try {
        const msg = await confirmEmail(token);
        setStatus("success");
        setMessage(`✅ ${msg} Redirecting to login…`);
        setTimeout(() => router.push("/login"), 3000);
      } catch (err) {
        setStatus("error");
        setMessage(err.message || "Something went wrong.");
      }
    };

    confirm();
  }, [token, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md bg-white p-6 rounded-md shadow">
        <h1 className="text-2xl font-bold text-[#ed8936] mb-4">
          Email Confirmation
        </h1>

        {status === "notice" && email && (
          <p className="text-gray-700">
            We’ve sent a confirmation link to{" "}
            <span className="font-semibold">{email}</span>. <br />
            Please check your inbox to verify your email.
          </p>
        )}

        {status === "loading" && (
          <p className="text-gray-700">Confirming your email…</p>
        )}

        {status === "success" && (
          <p className="text-green-700 font-medium">{message}</p>
        )}

        {status === "error" && (
          <p className="text-red-600 font-medium">{message}</p>
        )}
      </div>
    </main>
  );
}
