'use client'

import { motion } from 'framer-motion'
import { Cookie, Settings, Shield, Eye, Database, Bell } from 'lucide-react'
import Link from 'next/link'

export default function CookiePolicy() {
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
              <Cookie className="w-8 h-8 text-primary-600" />
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Cookie Policy
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn how we use cookies and similar technologies to enhance your browsing experience.
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

          {/* What Are Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                What Are Cookies?
              </h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                Cookies are small text files that are placed on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences, 
                analyzing how you use our site, and personalizing content.
              </p>
              <p>
                Cookies can be "session cookies" (which are deleted when you close your browser) or 
                "persistent cookies" (which remain on your device for a set period of time).
              </p>
            </div>
          </section>

          {/* How We Use Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                How We Use Cookies
              </h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                We use cookies for several purposes to improve your experience on our website:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Used for advertising and marketing purposes</li>
                <li><strong>Analytics Cookies:</strong> Provide insights into website usage patterns</li>
              </ul>
            </div>
          </section>

          {/* Types of Cookies We Use */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Types of Cookies We Use
              </h2>
            </div>
            <div className="space-y-6 text-gray-700">
              
              {/* Essential Cookies */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">Essential Cookies</h3>
                <p className="mb-2">These cookies are necessary for the website to function properly.</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>Authentication and security</li>
                  <li>Shopping cart functionality</li>
                  <li>Session management</li>
                  <li>Load balancing</li>
                </ul>
              </div>

              {/* Performance Cookies */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">Performance Cookies</h3>
                <p className="mb-2">These cookies help us understand how visitors interact with our website.</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>Page load times</li>
                  <li>Error tracking</li>
                  <li>User journey analysis</li>
                  <li>Website optimization</li>
                </ul>
              </div>

              {/* Functional Cookies */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">Functional Cookies</h3>
                <p className="mb-2">These cookies remember your preferences and provide enhanced functionality.</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>Language preferences</li>
                  <li>Currency settings</li>
                  <li>Product preferences</li>
                  <li>Personalized recommendations</li>
                </ul>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">Marketing Cookies</h3>
                <p className="mb-2">These cookies are used for advertising and marketing purposes.</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>Targeted advertising</li>
                  <li>Social media integration</li>
                  <li>Email marketing</li>
                  <li>Promotional campaigns</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Third-Party Cookies
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We may use third-party services that place cookies on your device. These services include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Google Analytics:</strong> Website analytics and performance tracking</li>
                <li><strong>Facebook Pixel:</strong> Social media advertising and conversion tracking</li>
                <li><strong>Stripe:</strong> Payment processing and security</li>
                <li><strong>Mailchimp:</strong> Email marketing and newsletter management</li>
                <li><strong>Hotjar:</strong> User behavior analysis and heatmaps</li>
              </ul>
              <p>
                These third-party services have their own privacy policies and cookie practices. 
                We encourage you to review their policies for more information.
              </p>
            </div>
          </section>

          {/* Cookie Management */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Managing Your Cookie Preferences
              </h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                You have several options for managing cookies on our website:
              </p>
              
              {/* Browser Settings */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">Browser Settings</h3>
                <p className="mb-2">You can control cookies through your browser settings:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>Chrome: Settings → Privacy and security → Cookies and other site data</li>
                  <li>Firefox: Options → Privacy & Security → Cookies and Site Data</li>
                  <li>Safari: Preferences → Privacy → Manage Website Data</li>
                  <li>Edge: Settings → Cookies and site permissions → Cookies and site data</li>
                </ul>
              </div>

              {/* Cookie Consent */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">Cookie Consent</h3>
                <p className="mb-2">When you first visit our website, you'll see a cookie consent banner that allows you to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>Accept all cookies</li>
                  <li>Reject non-essential cookies</li>
                  <li>Customize your cookie preferences</li>
                  <li>Learn more about our cookie policy</li>
                </ul>
              </div>

              {/* Opt-Out Options */}
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">Opt-Out Options</h3>
                <p className="mb-2">You can opt out of certain types of cookies:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>Google Analytics: Use the Google Analytics Opt-out Browser Add-on</li>
                  <li>Facebook: Adjust your Facebook ad preferences</li>
                  <li>Email Marketing: Unsubscribe from marketing emails</li>
                  <li>Personalized Ads: Use the Digital Advertising Alliance's opt-out tool</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Impact of Disabling Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Impact of Disabling Cookies
              </h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                While you can disable cookies, doing so may affect your experience on our website:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You may need to re-enter information repeatedly</li>
                <li>Some features may not work properly</li>
                <li>Personalized content may not be available</li>
                <li>Website performance may be affected</li>
                <li>You may see less relevant advertisements</li>
              </ul>
              <p>
                Essential cookies cannot be disabled as they are necessary for basic website functionality.
              </p>
            </div>
          </section>

          {/* Data Protection */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Data Protection
              </h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                We are committed to protecting your privacy and ensuring the security of your data:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All cookie data is encrypted and securely stored</li>
                <li>We do not sell or share your personal information with third parties</li>
                <li>Cookie data is used only for the purposes described in this policy</li>
                <li>We regularly review and update our cookie practices</li>
                <li>You can request deletion of your cookie data at any time</li>
              </ul>
            </div>
          </section>

          {/* Updates to Cookie Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Updates to This Cookie Policy
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We may update this cookie policy from time to time to reflect changes in our practices 
                or for other operational, legal, or regulatory reasons.
              </p>
              <p>
                When we make material changes to this policy, we will notify you by:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Posting a notice on our website</li>
                <li>Sending an email to registered users</li>
                <li>Updating the "Last updated" date at the top of this policy</li>
              </ul>
              <p>
                We encourage you to review this policy periodically to stay informed about our cookie practices.
              </p>
            </div>
          </section>

          {/* Related Policies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Related Policies
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                This cookie policy is part of our broader privacy and data protection framework:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/privacy" 
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Privacy Policy →
                </Link>
                <Link 
                  href="/terms" 
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Terms of Service →
                </Link>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                If you have any questions about our cookie policy or data practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p><strong>Email:</strong> privacy@freshgrocer.com</p>
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
