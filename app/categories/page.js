'use client'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { setCategories, setItems } from '../../store/slices/glossary-slice'
import categoriesData from '../../data/categories.json'
import itemsData from '../../data/glossary-items.json'
import Header from '../../components/layout/header'
import Footer from '../../components/layout/footer'
import Link from 'next/link'
import { 
  Leaf, 
  Fish, 
  Utensils, 
  Coffee, 
  Spray, 
  Bug, 
  PenTool, 
  Heart, 
  Activity, 
  PawPrint, 
  Microwave, 
  Baby 
} from 'lucide-react'

export default function CategoriesPage() {
  const dispatch = useDispatch()
  const { categories, items } = useSelector((state) => state.glossary)

  useEffect(() => {
    // Load data if not already loaded
    if (categories.length === 0) {
      dispatch(setCategories(categoriesData))
    }
    if (items.length === 0) {
      dispatch(setItems(itemsData))
    }
  }, [dispatch, categories.length, items.length])

  // Calculate item count for each category
  const getItemCount = (categoryName) => {
    return items.filter(item => item.category === categoryName).length
  }

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
                Browse Categories
              </h1>
              <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                Explore our comprehensive collection of fresh groceries organized by category
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category, index) => {
                const itemCount = getItemCount(category.name)
                const IconComponent = getIconComponent(category.icon)
                
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group-hover:border-primary-300">
                        <div className="flex items-center justify-between mb-4">
                          <div 
                            className={`w-12 h-12 rounded-lg flex items-center justify-center`}
                            style={{ backgroundColor: category.color + '20' }}
                          >
                            <IconComponent 
                              className="w-6 h-6" 
                              style={{ color: category.color }}
                            />
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {itemCount} items
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {category.name}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {category.description}
                        </p>
                        
                        <div className="flex items-center text-primary-600 text-sm font-medium group-hover:text-primary-700 transition-colors">
                          Explore category
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
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-16 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                             <h2 className="text-3xl font-bold text-gray-900 mb-4">
                 Grocery Store Overview
               </h2>
               <p className="text-gray-600 max-w-2xl mx-auto">
                 Our comprehensive collection spans multiple categories and product types
               </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {categories.length}
                </div>
                <div className="text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {items.length}
                </div>
                                 <div className="text-gray-600">Total Products</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {Math.round(items.length / categories.length)}
                </div>
                <div className="text-gray-600">Avg. per Category</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

// Helper function to get icon component
function getIconComponent(iconName) {
  const icons = {
    'leaf': Leaf,
    'fish': Fish,
    'utensils': Utensils,
    'coffee': Coffee,
    'spray': Spray,
    'bug': Bug,
    'pen-tool': PenTool,
    'heart': Heart,
    'activity': Activity,
    'paw-print': PawPrint,
    'microwave': Microwave,
    'baby': Baby,
  }
  
  return icons[iconName] || Leaf
}


