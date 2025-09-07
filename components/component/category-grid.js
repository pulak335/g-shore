'use client'

import { motion } from 'framer-motion'
import { Leaf, Fish, Utensils, Coffee, Spray, Bug, PenTool, Heart, Activity, PawPrint, Microwave, Baby } from 'lucide-react'
import Link from 'next/link'

const iconMap = {
  leaf: Leaf,
  fish: Fish,
  utensils: Utensils,
  coffee: Coffee,
  spray: Spray,
  bug: Bug,
  'pen-tool': PenTool,
  heart: Heart,
  activity: Activity,
  'paw-print': PawPrint,
  microwave: Microwave,
  baby: Baby,
}



export default function CategoryGrid({ categories }) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Explore Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover fresh groceries organized by category. Find exactly what you need for your daily shopping.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {categories.map((category, index) => {
           const IconComponent = iconMap[category.icon] || Leaf
          
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                 <div className="card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                   <div 
                     className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                     style={{ backgroundColor: category.color + '20' }}
                   >
                     <IconComponent 
                       className="w-6 h-6" 
                       style={{ color: category.color }}
                     />
                   </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center text-primary-600 font-medium text-sm">
                    Explore Category
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

        <div className="text-center mt-12">
          <Link href="/categories" className="btn btn-primary btn-lg">
            Shop All Categories
          </Link>
        </div>
      </div>
    </section>
  )
}
