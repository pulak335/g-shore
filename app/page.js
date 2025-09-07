'use client'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { setCategories, setItems } from '../store/slices/glossary-slice'
import categoriesData from '../data/categories.json'
import itemsData from '../data/glossary-items.json'
import Hero from '../components/layout/hero'
import CategoryGrid from '../components/component/category-grid'
import FeaturedItems from '../components/component/featured-items'
import { 
  TrendingUp, 
  Zap, 
  Star, 
  ShoppingCart, 
  Eye, 
  ArrowRight,
  Leaf,
  Fish,
  Utensils,
  Gift,
  Clock,
  Truck,
  Percent
} from 'lucide-react'
import Link from 'next/link'
import Header from '../components/layout/header'
import brandService from '../services/brand-service'

export default function HomePage() {
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

  // Get products by category
  const fruitsAndVegetables = items.filter(item => item.category === 'Fruits & Vegetables').slice(0, 4)
  const meatAndFish = items.filter(item => item.category === 'Meat & Fish').slice(0, 4)
  const cooking = items.filter(item => item.category === 'Cooking').slice(0, 4)
  
  // Get best selling products (highest rated)
  const bestSelling = [...items]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6)

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      <main>
        <CategoryGrid categories={categories} />
        
        <FeaturedItems items={items.slice(0, 6)} />

        {/* Marketing Banner */}
        <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-repeat" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Main Banner Content */}
              <div className="mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Gift className="w-8 h-8 text-white" />
                  <h2 className="text-3xl lg:text-5xl font-bold text-white">
                    Special Offer!
                  </h2>
                  <Percent className="w-8 h-8 text-white" />
                </div>
                <p className="text-xl lg:text-2xl text-primary-100 mb-6">
                  Get <span className="font-bold text-yellow-300">25% OFF</span> on your first order
                </p>
                <p className="text-lg text-primary-200 max-w-3xl mx-auto mb-8">
                  Fresh groceries delivered to your door with our premium service. 
                  Use code <span className="font-bold text-yellow-300 bg-white/20 px-2 py-1 rounded">WELCOME25</span> at checkout.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Free Delivery</h3>
                  <p className="text-primary-200">On orders over $50</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Same Day Delivery</h3>
                  <p className="text-primary-200">Order by 2 PM</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Fresh Guarantee</h3>
                  <p className="text-primary-200">100% satisfaction or refund</p>
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link 
                  href="/store"
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="/categories"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary-600 transition-colors flex items-center gap-2"
                >
                  Browse Categories
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              {/* Limited Time Notice */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-8 text-center"
              >
                <p className="text-primary-200 text-sm">
                  ⏰ Limited time offer - Valid until end of month
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Fruits & Vegetables Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Fresh Fruits & Vegetables
                </h2>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Farm-fresh produce delivered to your doorstep. Organic, healthy, and delicious.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {fruitsAndVegetables.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <Link href={`/product/${item.id}`}>
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">{item.title.charAt(0)}</span>
                      </div>
                    </div>
                  </Link>

                  <div className="p-4">
                    {/* Brand */}
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">{brandService.getBrandLogo(item.brand)}</span>
                      <span className="text-sm font-medium text-gray-700">{item.brand}</span>
                    </div>
                    
                    <Link href={`/product/${item.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2 hover:text-green-600">
                        {item.title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(item.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">({item.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-green-600">
                        ${item.price}
                        {item.originalPrice && item.originalPrice > item.price && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                            <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-medium">
                              -{item.discount}%
                            </span>
                          </div>
                        )}
                      </div>
                      <button className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link 
                href="/categories/Fruits & Vegetables"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                View All Fruits & Vegetables
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Meat & Fish Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Fish className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Fresh Meat & Fish
                </h2>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Premium quality meat and fresh seafood. Hand-selected for the best taste and nutrition.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {meatAndFish.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <Link href={`/product/${item.id}`}>
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">{item.title.charAt(0)}</span>
                      </div>
                    </div>
                  </Link>

                  <div className="p-4">
                    {/* Brand */}
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">{brandService.getBrandLogo(item.brand)}</span>
                      <span className="text-sm font-medium text-gray-700">{item.brand}</span>
                    </div>
                    
                    <Link href={`/product/${item.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2 hover:text-blue-600">
                        {item.title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(item.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">({item.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-blue-600">
                        ${item.price}
                        {item.originalPrice && item.originalPrice > item.price && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                            <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-medium">
                              -{item.discount}%
                            </span>
                          </div>
                        )}
                      </div>
                      <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link 
                href="/categories/Meat & Fish"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View All Meat & Fish
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Cooking Essentials Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Utensils className="w-8 h-8 text-orange-600" />
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Cooking Essentials
                </h2>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Premium oils, spices, and cooking ingredients to elevate your culinary creations.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cooking.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <Link href={`/product/${item.id}`}>
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">{item.title.charAt(0)}</span>
                      </div>
                    </div>
                  </Link>

                  <div className="p-4">
                    {/* Brand */}
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">{brandService.getBrandLogo(item.brand)}</span>
                      <span className="text-sm font-medium text-gray-700">{item.brand}</span>
                    </div>
                    
                    <Link href={`/product/${item.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2 hover:text-orange-600">
                        {item.title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(item.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">({item.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-orange-600">
                        ${item.price}
                        {item.originalPrice && item.originalPrice > item.price && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                            <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-medium">
                              -{item.discount}%
                            </span>
                          </div>
                        )}
                      </div>
                      <button className="p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link 
                href="/categories/Cooking"
                className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                View All Cooking Essentials
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Best Selling Products Section */}
        <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-primary-600" />
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Best Selling Products
                </h2>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our most popular products loved by customers. High quality, great reviews, and amazing value.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bestSelling.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <Link href={`/product/${item.id}`}>
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                        <span className="text-white text-3xl font-bold">{item.title.charAt(0)}</span>
                      </div>
                      {/* Best Seller Badge */}
                      <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Best Seller
                      </div>
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{brandService.getBrandLogo(item.brand)}</span>
                        <span className="text-sm text-gray-500">by {item.brand}</span>
                      </div>
                    </div>

                    <Link href={`/product/${item.id}`}>
                      <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 mb-3 hover:text-primary-600">
                        {item.title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(item.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 font-semibold">{item.rating}</span>
                      <span className="text-sm text-gray-500">({item.reviews} reviews)</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-primary-600">
                        ${item.price}
                        {item.originalPrice && item.originalPrice > item.price && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                            <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-medium">
                              -{item.discount}%
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/product/${item.id}`}>
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </Link>
                        <button className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/store"
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-lg"
              >
                Explore All Products
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Special Offers Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <Zap className="w-16 h-16 mx-auto mb-6 text-yellow-500" />
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Special Offers
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Limited time deals and discounts on your favorite grocery items
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-8 text-center"
              >
                <h3 className="text-2xl font-bold mb-4">Fresh Produce</h3>
                <p className="text-red-100 mb-6">Get 20% off on all fresh fruits and vegetables</p>
                <Link href="/categories/fruits-vegetables" className="inline-block bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Shop Now
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-8 text-center"
              >
                <h3 className="text-2xl font-bold mb-4">Organic Products</h3>
                <p className="text-blue-100 mb-6">15% discount on all organic and natural products</p>
                <Link href="/store?category=organic" className="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Shop Now
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-8 text-center"
              >
                <h3 className="text-2xl font-bold mb-4">Free Delivery</h3>
                <p className="text-green-100 mb-6">Free delivery on orders above $50</p>
                <Link href="/store" className="inline-block bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Shop Now
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our Grocery Store?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We provide the best shopping experience with quality products and excellent service
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: "🚚",
                  title: "Fast Delivery",
                  description: "Same day delivery for fresh products"
                },
                {
                  icon: "🌱",
                  title: "Fresh & Organic",
                  description: "Handpicked fresh and organic products"
                },
                {
                  icon: "💰",
                  title: "Best Prices",
                  description: "Competitive prices with great value"
                },
                {
                  icon: "🛡️",
                  title: "Quality Guaranteed",
                  description: "100% satisfaction guarantee"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                What Our Customers Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real reviews from satisfied customers who love our products and service
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Home Chef",
                  rating: 5,
                  content: "The quality of fresh produce is amazing! I love how everything is so fresh and the delivery is super fast."
                },
                {
                  name: "Mike Chen",
                  role: "Food Blogger",
                  rating: 5,
                  content: "Best grocery store I've found online. The organic selection is incredible and prices are very reasonable."
                },
                {
                  name: "Emily Rodriguez",
                  role: "Health Enthusiast",
                  rating: 5,
                  content: "I'm impressed with their commitment to quality. All the products are exactly as described and delivered fresh."
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Zap className="w-16 h-16 mx-auto mb-6 text-primary-200" />
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Stay Updated
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for exclusive offers, new products, and grocery tips
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                />
                <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Popular Brands Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Popular Brands
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Trusted brands that families love and rely on for quality products
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
              {[
                { name: "PRAN", logo: "PRAN", color: "bg-red-600", textColor: "text-white" },
                { name: "Reckitt", logo: "reckitt", color: "bg-pink-500", textColor: "text-white" },
                { name: "Nestlé", logo: "Nestlé", color: "bg-blue-600", textColor: "text-white" },
                { name: "Unilever", logo: "Unilever", color: "bg-blue-500", textColor: "text-white" },
                { name: "Marico", logo: "marico", color: "bg-green-600", textColor: "text-white" },
                { name: "Godrej", logo: "Godrej", color: "bg-gradient-to-r from-green-500 to-blue-500", textColor: "text-white" },
                { name: "Coca-Cola", logo: "Coca-Cola", color: "bg-red-600", textColor: "text-white" },
                { name: "MGI", logo: "MGI", color: "bg-blue-700", textColor: "text-white" }
              ].map((brand, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className={`w-20 h-20 ${brand.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <span className={`${brand.textColor} font-bold text-sm`}>
                      {brand.logo}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                    {brand.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
