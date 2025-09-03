"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/src/components/ui/select";

export default function FeedbackPage() {
  const [form, setForm] = useState({
    type: "",
    issueType: "",
    rating: "",
    message: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted:", form);
    alert("Thank you for your feedback!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
      <Card className="w-full max-w-lg bg-gray-800/80 text-white border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Feedback & Reports</CardTitle>
          <p className="text-sm text-gray-400">Help us improve Eco_Chain 🌱</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Type of Feedback */}
            <div>
              <label className="text-sm text-gray-300">Type</label>
              <Select
                onValueChange={(val) => setForm({ ...form, type: val })}
              >
                <SelectTrigger className="mt-1 bg-gray-700 text-white border-gray-600">
                  <SelectValue placeholder="Select feedback type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="feedback">General Feedback</SelectItem>
                  <SelectItem value="issue">Report an Issue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Issue Type (only if reporting issue) */}
            {form.type === "issue" && (
              <div>
                <label className="text-sm text-gray-300">Issue Type</label>
                <Select
                  onValueChange={(val) => setForm({ ...form, issueType: val })}
                >
                  <SelectTrigger className="mt-1 bg-gray-700 text-white border-gray-600">
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="no-credits">Didn’t receive credits</SelectItem>
                    <SelectItem value="delay">Credits taking too long</SelectItem>
                    <SelectItem value="wrong-amount">Wrong amount credited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Rating */}
            <div>
              <label className="text-sm text-gray-300">Rate your experience</label>
              <Select
                onValueChange={(val) => setForm({ ...form, rating: val })}
              >
                <SelectTrigger className="mt-1 bg-gray-700 text-white border-gray-600">
                  <SelectValue placeholder="Choose rating" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="5">⭐️⭐️⭐️⭐️⭐️ Excellent</SelectItem>
                  <SelectItem value="4">⭐️⭐️⭐️⭐️ Good</SelectItem>
                  <SelectItem value="3">⭐️⭐️⭐️ Average</SelectItem>
                  <SelectItem value="2">⭐️⭐️ Poor</SelectItem>
                  <SelectItem value="1">⭐️ Terrible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm text-gray-300">Your Feedback</label>
              <Textarea
                className="mt-1 bg-gray-700 text-white border-gray-600"
                rows={4}
                placeholder="Write your feedback or describe the issue..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-300">Email (optional)</label>
              <Input
                className="mt-1 bg-gray-700 text-white border-gray-600"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500">
              Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
