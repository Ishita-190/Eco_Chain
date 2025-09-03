"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Select } from "@/src/components/ui/select"; // ✅ using your simple Select

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
                className="w-full mt-1 bg-gray-700 text-white border-gray-600 rounded-lg p-2"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="">Select feedback type</option>
                <option value="feedback">General Feedback</option>
                <option value="issue">Report an Issue</option>
              </Select>
            </div>

            {/* Issue Type (only if reporting issue) */}
            {form.type === "issue" && (
              <div>
                <label className="text-sm text-gray-300">Issue Type</label>
                <Select
                  className="w-full mt-1 bg-gray-700 text-white border-gray-600 rounded-lg p-2"
                  value={form.issueType}
                  onChange={(e) => setForm({ ...form, issueType: e.target.value })}
                >
                  <option value="">Select issue type</option>
                  <option value="no-credits">Didn’t receive credits</option>
                  <option value="delay">Credits taking too long</option>
                  <option value="wrong-amount">Wrong amount credited</option>
                </Select>
              </div>
            )}

            {/* Rating */}
            <div>
              <label className="text-sm text-gray-300">Rate your experience</label>
              <Select
                className="w-full mt-1 bg-gray-700 text-white border-gray-600 rounded-lg p-2"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
              >
                <option value="">Choose rating</option>
                <option value="5">⭐️⭐️⭐️⭐️⭐️ Excellent</option>
                <option value="4">⭐️⭐️⭐️⭐️ Good</option>
                <option value="3">⭐️⭐️⭐️ Average</option>
                <option value="2">⭐️⭐️ Poor</option>
                <option value="1">⭐️ Terrible</option>
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
