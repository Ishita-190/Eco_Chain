'use client';

import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Your privacy matters to us. Here’s how Eco_Chain 🌱 protects and uses your data.
          </p>
        </motion.div>

        {/* Policy Content */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-700 space-y-6"
        >
          <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
          <p className="text-gray-300">
            We collect only the information necessary to provide our services, such as your name, email,
            and wallet address when you register. We do not sell or rent your personal data to third parties.
          </p>

          <h2 className="text-2xl font-semibold">2. How We Use Your Data</h2>
          <p className="text-gray-300">
            Your data is used to improve your experience, personalize features, and process transactions 
            securely. We may also use anonymized data for analytics and sustainability research.
          </p>

          <h2 className="text-2xl font-semibold">3. Data Security</h2>
          <p className="text-gray-300">
            We implement strict security measures, including encryption and secure servers, to protect 
            your data. However, no method of transmission is 100% secure, so we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-semibold">4. Third-Party Services</h2>
          <p className="text-gray-300">
            We may use trusted third-party tools (like payment gateways) that have their own privacy policies. 
            Please review their policies to understand how they handle your information.
          </p>

          <h2 className="text-2xl font-semibold">5. Your Rights</h2>
          <p className="text-gray-300">
            You have the right to access, update, or delete your data. Contact us at 
            <span className="text-emerald-400"> support@ecochain.com </span> if you wish to exercise these rights.
          </p>

          <h2 className="text-2xl font-semibold">6. Changes to this Policy</h2>
          <p className="text-gray-300">
            We may update this Privacy Policy from time to time. Changes will be posted on this page 
            with the updated date.
          </p>
        </motion.section>

        {/* Last Updated */}
        <p className="text-xs text-gray-500 text-center">
          Last updated: September 2025
        </p>
      </main>
    </div>
  );
}
