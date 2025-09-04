"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/src/components/ui/select";

export default function FeedbackPage() {
  const [form, setForm] = useState({
    type: "",
    issueType: "",
    rating: "",
    message: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted:", form);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
      <AnimatePresence>
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg"
          >
            <Card className="bg-gray-800/90 text-white border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Feedback & Reports</CardTitle>
                <p className="text-sm text-gray-400">Help us improve Eco_Chain 🌱</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Type of Feedback */}
                  <div>
                    <label className="text-sm text-gray-300">Type</label>
                    <Select
                      value={form.type}
                      onValueChange={(value) => setForm({ ...form, type: value })}
                    >
                      <SelectTrigger className="w-full mt-1 bg-gray-700 text-white border-gray-600 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500">
                        <SelectValue placeholder="Select feedback type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 text-white rounded-lg">
                        <SelectItem value="feedback">General Feedback</SelectItem>
                        <SelectItem value="issue">Report an Issue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Issue Type */}
                  {form.type === "issue" && (
                    <div>
                      <label className="text-sm text-gray-300">Issue Type</label>
                      <Select
                        value={form.issueType}
                        onValueChange={(value) => setForm({ ...form, issueType: value })}
                      >
                        <SelectTrigger className="w-full mt-1 bg-gray-700 text-white border-gray-600 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500">
                          <SelectValue placeholder="Select issue type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 text-white rounded-lg">
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
                      value={form.rating}
                      onValueChange={(value) => setForm({ ...form, rating: value })}
                    >
                      <SelectTrigger className="w-full mt-1 bg-gray-700 text-white border-gray-600 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500">
                        <SelectValue placeholder="Choose rating" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 text-white rounded-lg">
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
                      className="mt-1 bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-emerald-500"
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
                      className="mt-1 bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-emerald-500"
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
          </motion.div>
        ) : (
          <motion.div
            key="thankyou"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg"
          >
            <Card className="bg-gray-800/90 text-white border-gray-700 shadow-lg p-6 text-center">
              <h2 className="text-2xl font-bold mb-2">🎉 Thank You!</h2>
              <p className="text-gray-400 mb-4">Your feedback has been submitted successfully.</p>
              <Button
                onClick={() => setSubmitted(false)}
                className="bg-emerald-600 hover:bg-emerald-500"
              >
                Submit Another Response
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
