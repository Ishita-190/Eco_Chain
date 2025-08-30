import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// Initialize Redis client using environment variables
const redis = Redis.fromEnv();

export const POST = async () => {
  try {
    // Fetch data from Redis
    const result = await redis.get("item");

    return NextResponse.json({ result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Redis fetch failed" },
      { status: 500 }
    );
  }
};
