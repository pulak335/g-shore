'use client'

import { motion } from 'framer-motion'
import { FileText, CheckCircle, AlertTriangle, Scale, Users, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-primary-600" />
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Terms of Service
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully before using our services.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-8 space-y-8"
        >
          {/* Last Updated */}
          <div className="text-center pb-6 border-b border-gray-200">
            <p className="text-sm text-gray-500">
              Last updated: January 15, 2024
            </p>
          </div>

          {/* Acceptance of Terms */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Acceptance of Terms
              </h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                By accessing and using FreshGrocer's website and services, you accept and agree to be bound by 
                the terms and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
              <p>
                These terms apply to all visitors, users, and others who access or use the service.
              </p>
            </div>
          </section>

          {/* Description of Service */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <ShoppingCart className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Description of Service
              </h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                FreshGrocer provides an online grocery shopping platform where customers can:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Browse and purchase fresh groceries and household items</li>
                <li>Schedule delivery or pickup times</li>
                <li>Manage their account and order history</li>
                <li>Access customer support and assistance</li>
                <li>Receive notifications about orders and promotions</li>
              </ul>
            </div>
          </section>

          {/* User Accounts */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                User Accounts
              </h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                When you create an account with us, you must provide information that is accurate, 
                complete, and current at all times.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You are responsible for safeguarding the password and for all activities under your account</li>
                <li>You agree not to disclose your password to any third party</li>
                <li>You must notify us immediately of any unauthorized use of your account</li>
                <li>You may not use as a username the name of another person or entity</li>
                <li>You may not use as a username any name that is offensive, vulgar, or obscene</li>
              </ul>
            </div>
          </section>

          {/* Ordering and Payment */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ordering and Payment
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                By placing an order through our service, you agree to the following terms:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Order Confirmation:</strong> Orders are subject to acceptance and availability</li>
                <li><strong>Pricing:</strong> All prices are subject to change without notice</li>
                <li><strong>Payment:</strong> Payment is due at the time of order placement</li>
                <li><strong>Delivery:</strong> Delivery times are estimates and may vary</li>
                <li><strong>Cancellation:</strong> Orders may be cancelled within specified timeframes</li>
                <li><strong>Returns:</strong> Returns are subject to our return policy</li>
              </ul>
            </div>
          </section>

          {/* Prohibited Uses */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Prohibited Uses
              </h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                You may not use the service for any unlawful purpose or to solicit others to perform 
                unlawful acts. You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon or violate our intellectual property rights</li>
                <li>Harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>Submit false or misleading information</li>
                <li>Upload or transmit viruses or any other type of malicious code</li>
                <li>Collect or track the personal information of others</li>
                <li>Spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                <li>Interfere with or circumvent the security features of the service</li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Intellectual Property
              </h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                The service and its original content, features, and functionality are and will remain 
                the exclusive property of FreshGrocer and its licensors.
              </p>
              <p>
                The service is protected by copyright, trademark, and other laws. Our trademarks and 
                trade dress may not be used in connection with any product or service without our 
                prior written consent.
              </p>
            </div>
          </section>

          {/* Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also governs 
                your use of the service, to understand our practices.
              </p>
              <Link 
                href="/privacy" 
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
              >
                View Privacy Policy →
              </Link>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Limitation of Liability
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                In no event shall FreshGrocer, nor its directors, employees, partners, agents, suppliers, 
                or affiliates, be liable for any indirect, incidental, special, consequential, or 
                punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                or other intangible losses, resulting from your use of the service.
              </p>
              <p>
                FreshGrocer's total liability to you for any claims arising from your use of the service 
                shall not exceed the amount you paid to FreshGrocer for the service in the twelve (12) 
                months preceding the claim.
              </p>
            </div>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Disclaimers
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                The information on this service is provided on an "as is" basis. FreshGrocer makes no 
                warranties, expressed or implied, and hereby disclaims and negates all other warranties 
                including without limitation, implied warranties or conditions of merchantability, 
                fitness for a particular purpose, or non-infringement of intellectual property.
              </p>
              <p>
                FreshGrocer does not warrant that the service will be uninterrupted or error-free, 
                that defects will be corrected, or that the service or the server that makes it available 
                are free of viruses or other harmful components.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Governing Law
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                These terms shall be interpreted and governed by the laws of the United States, 
                without regard to its conflict of law provisions.
              </p>
              <p>
                Our failure to enforce any right or provision of these terms will not be considered 
                a waiver of those rights.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Changes to Terms
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We reserve the right, at our sole discretion, to modify or replace these terms at any time. 
                If a revision is material, we will try to provide at least 30 days notice prior to any 
                new terms taking effect.
              </p>
              <p>
                What constitutes a material change will be determined at our sole discretion. By continuing 
                to access or use our service after those revisions become effective, you agree to be bound 
                by the revised terms.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                If you have any questions about these terms of service, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p><strong>Email:</strong> legal@freshgrocer.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Address:</strong> 123 Grocery St, Fresh City, FC 12345</p>
              </div>
            </div>
          </section>

          {/* Back to Home */}
          <div className="text-center pt-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
            >
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
