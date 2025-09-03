'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState('');
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send feedback to backend or API
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-12">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            Feedback & Report
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
            Share your feedback about Eco_Chain 🌱 or let us know if you're facing issues with credits.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-700 space-y-6"
        >
          {/* Feedback */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              General Feedback
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              placeholder="Tell us what you love, what could be improved..."
              className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-emerald-400 outline-none text-gray-200"
            />
          </div>

          {/* Report Issue */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Report an Issue with Credits
            </label>
            <textarea
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              rows={4}
              placeholder="Didn’t receive credits? Took too long? Describe the issue..."
              className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-emerald-400 outline-none text-gray-200"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-semibold rounded-xl shadow-md hover:opacity-90 transition"
            >
              Submit
            </button>
          </div>

          {/* Success Message */}
          {submitted && (
            <p className="text-center text-emerald-400 mt-4">
              ✅ Thank you! Your feedback has been submitted.
            </p>
          )}
        </motion.form>
      </main>
    </div>
  );
}
