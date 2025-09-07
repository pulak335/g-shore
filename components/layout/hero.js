'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react'
import Link from 'next/link'
import Header from './header'

export default function Hero() {
  return (
    <section className="relative  text-white  bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('https://assets.aboutamazon.com/b7/2e/3ae10ddd49acaad7e67e629a2437/fresh-chicago-hero.jpg')]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Your Gateway to
                <span className="block text-primary-200">Fresh Groceries</span>
              </h1>
              <p className="text-xl lg:text-2xl text-primary-300 max-w-2xl">
                Discover fresh produce, quality groceries, and household essentials delivered to your doorstep for a convenient shopping experience.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/store" className="btn btn-lg bg-white text-primary-600 hover:bg-gray-100 flex items-center justify-center">
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/categories" className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary-600 flex items-center justify-center">
                Explore Categories
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-200">500+</div>
                <div className="text-sm text-primary-100">Fresh Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-200">50K+</div>
                <div className="text-sm text-primary-100">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-200">12</div>
                <div className="text-sm text-primary-100">Categories</div>
              </div>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-400 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Fresh Fruits & Vegetables</h3>
                    <p className="text-primary-200 text-sm">Organic produce daily</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-400 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Quality Meat & Fish</h3>
                    <p className="text-primary-200 text-sm">Fresh & premium cuts</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-400 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Household Essentials</h3>
                    <p className="text-primary-200 text-sm">Cleaning & care products</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
