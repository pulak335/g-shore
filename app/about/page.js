'use client'

import { motion } from 'framer-motion'
import Header from '../../components/layout/header'
import Footer from '../../components/layout/footer'
import { BookOpen, Users, Award, Globe, Shield, Zap } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                About Grocery Store
              </h1>
              <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                Providing fresh groceries and quality products to families with convenient shopping experience
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  We believe that quality groceries should be accessible to every family. Our platform provides fresh 
                  produce, quality groceries, and household essentials designed to make your daily shopping convenient 
                  and enjoyable.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Whether you're a busy parent, health-conscious individual, or home cook, our carefully selected products 
                  help you maintain a healthy lifestyle and create delicious meals for your family.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Fresh Produce</h3>
                        <p className="text-gray-600 text-sm">Sourced from local farms</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Quality Products</h3>
                        <p className="text-gray-600 text-sm">Carefully selected for families</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
                        <p className="text-gray-600 text-sm">Same-day delivery available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Us
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover what makes our store the preferred choice for families worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: "Fresh Produce",
                  description: "All fruits and vegetables are carefully selected and sourced from local farms to ensure freshness and quality."
                },
                {
                  icon: Globe,
                  title: "Wide Selection",
                  description: "Access groceries from anywhere, with a comprehensive selection of products available 24/7."
                },
                {
                  icon: Shield,
                  title: "Quality Assured",
                  description: "Your shopping experience is protected with quality guarantees and reliable product standards."
                },
                {
                  icon: Zap,
                  title: "Fast Delivery",
                  description: "Optimized delivery ensures quick service and seamless shopping experience."
                },
                {
                  icon: Users,
                  title: "Family Focused",
                  description: "Join a community of families and get support from our customer service team."
                },
                {
                  icon: Award,
                  title: "Customer Satisfaction",
                  description: "Thousands of families have successfully shopped with us and trust our quality."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Our Impact
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Numbers that reflect our commitment to serving families worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: "500+", label: "Fresh Products" },
                { number: "50K+", label: "Happy Customers" },
                { number: "12", label: "Categories" },
                { number: "24/7", label: "Support Available" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-primary-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Start Shopping?
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Join thousands of families who have already enjoyed our fresh groceries and quality products
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/store" className="btn btn-lg bg-white text-primary-600 hover:bg-gray-100">
                  Shop Now
                </Link>
                <Link href="/categories" className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                  Browse Categories
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

    </div>
  )
}
