"use client";

import { XCircle, ArrowLeft, HelpCircle, RefreshCw, Mail } from "lucide-react";
import Link from "next/link";

export default function CanceledPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Canceled Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Canceled Header */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 px-6 py-8 text-center">
            <div className="inline-flex p-3 bg-white rounded-full mb-4">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Payment Canceled
            </h1>
            <p className="text-red-100">
              Your payment was not completed
            </p>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Message */}
            <div className="text-center mb-8">
              <p className="text-gray-600 mb-2">
                Your payment was canceled. No charges have been made to your account.
              </p>
              <p className="text-gray-600">
                You can try again whenever you're ready.
              </p>
            </div>

            {/* Common Reasons */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-yellow-600" />
                Common Reasons for Cancelation
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• You decided to complete the setup later</li>
                <li>• You encountered a technical issue during checkout</li>
                <li>• You wanted to review the plan details again</li>
                <li>• Your payment method was not accepted</li>
              </ul>
            </div>

            {/* Need Help */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                Need Assistance?
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                If you encountered any issues or have questions about the plans, our team is here to help.
              </p>
              <a
                href="mailto:support@example.com"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Contact Support
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/onboarding"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Link>
              <Link
                href="/"
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Still having issues? Call us at{" "}
            <a href="tel:+18005551234" className="text-blue-600 hover:underline">
              (800) 555-1234
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}