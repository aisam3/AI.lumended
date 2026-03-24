"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, ArrowRight, Home, Download, Mail, Loader2 } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams.get("session_id");
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        // Verify the payment status with your backend
        const verifyPayment = async () => {
            if (sessionId) {
                try {
                    const response = await fetch(`/api/verify-payment?session_id=${sessionId}`);
                    const data = await response.json();

                    if (data.status === "complete") {
                        setStatus("success");
                        // Start countdown for auto-redirect
                        const timer = setInterval(() => {
                            setCountdown((prev) => {
                                if (prev <= 1) {
                                    clearInterval(timer);
                                    router.push("/dashboard");
                                    return 0;
                                }
                                return prev - 1;
                            });
                        }, 1000);

                        return () => clearInterval(timer);
                    } else {
                        setStatus("error");
                    }
                } catch (error) {
                    console.error("Error verifying payment:", error);
                    setStatus("error");
                }
            } else {
                setStatus("error");
            }
        };

        verifyPayment();
    }, [sessionId, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="flex justify-center mb-6">
                        <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Verifying Your Payment
                    </h2>
                    <p className="text-gray-600">
                        Please wait while we confirm your payment...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Success Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Success Header */}
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-8 text-center">
                        <div className="inline-flex p-3 bg-white rounded-full mb-4">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Payment Successful!
                        </h1>
                        <p className="text-green-100">
                            Thank you for choosing our warranty management system
                        </p>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8">
                        {/* Confirmation Message */}
                        <div className="text-center mb-8">
                            <p className="text-gray-600 mb-2">
                                Your payment has been processed successfully.
                            </p>
                            <p className="text-gray-600">
                                We've sent a confirmation email to your inbox with all the details.
                            </p>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
                            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                Order Summary
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Professional Plan</span>
                                    <span className="font-medium">$199/month</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Setup Fee</span>
                                    <span className="font-medium">$99 one-time</span>
                                </div>
                                <div className="border-t border-gray-200 my-2 pt-2">
                                    <div className="flex justify-between font-semibold">
                                        <span>Total Charged</span>
                                        <span className="text-green-600">$298.00</span>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500 mt-2">
                                    <p>✓ First payment: $298.00</p>
                                    <p>✓ Next billing: $199.00/month starting next month</p>
                                    <p>✓ Cancel anytime with 30-day money-back guarantee</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/"
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 font-medium"
                            >
                                Go to Home
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <button
                                onClick={() => window.print()}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                            >
                                Print Receipt
                            </button>
                        </div>
                    </div>
                </div>

                {/* Support Section */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Need help? Contact our support team at{" "}
                        <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
                            support@example.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}