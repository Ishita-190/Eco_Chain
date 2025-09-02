"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-6"
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      Back to Home
    </button>
  );
}
