'use client'

import { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { setCategories, setItems, setSearchQuery } from '../../../store/slices/glossary-slice'
import { addToCart } from '../../../store/slices/cart-slice'
import categoriesData from '../../../data/categories.json'
import itemsData from '../../../data/glossary-items.json'
import Header from '../../../components/layout/header'
import Footer from '../../../components/layout/footer'
import { Search, ShoppingCart, Star, Eye, X, ChevronDown, ChevronUp, Sliders, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import brandService from '../../../services/brand-service'

export default function CategoryPage() {
  const params = useParams()
  const dispatch = useDispatch()
  const { categories, items, searchQuery } = useSelector((state) => state.glossary)
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('newest')
  
  // Advanced filter states
  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedRatings, setSelectedRatings] = useState([])
  const [availabilityFilter, setAvailabilityFilter] = useState('all')
  const [expandedFilters, setExpandedFilters] = useState({
    price: false,
    brands: false,
    ratings: false,
    availability: false
  })

  useEffect(() => {
    // Load data if not already loaded
    if (categories.length === 0) {
      dispatch(setCategories(categoriesData))
    }
    if (items.length === 0) {
      dispatch(setItems(itemsData))
    }
  }, [dispatch, categories.length, items.length])

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query))
  }

  const handleAddToCart = (item) => {
    dispatch(addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: 1
    }))
  }

  // Get category details
  const categoryDetails = useMemo(() => {
    return categories.find(cat => cat.name === params.category)
  }, [categories, params.category])

  // Get products for this category
  const categoryProducts = useMemo(() => {
    return items.filter(item => item.category === params.category)
  }, [items, params.category])

  // Get unique brands from category products
  const availableBrands = useMemo(() => {
    const brands = [...new Set(categoryProducts.map(item => item.brand || 'Generic'))]
    return brands.sort()
  }, [categoryProducts])

  // Get price range from category products
  const priceRangeData = useMemo(() => {
    const prices = categoryProducts.map(item => item.price)
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    }
  }, [categoryProducts])

  // Filter products based on all criteria
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = categoryProducts

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Price range filter
    filtered = filtered.filter(item => 
      item.price >= priceRange[0] && item.price <= priceRange[1]
    )

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(item => 
        selectedBrands.includes(item.brand || 'Generic')
      )
    }

    // Rating filter
    if (selectedRatings.length > 0) {
      filtered = filtered.filter(item => 
        selectedRatings.some(rating => {
          const itemRating = Math.floor(item.rating)
          return rating === itemRating
        })
      )
    }

    // Availability filter
    if (availabilityFilter === 'in-stock') {
      filtered = filtered.filter(item => item.inStock !== false)
    } else if (availabilityFilter === 'out-of-stock') {
      filtered = filtered.filter(item => item.inStock === false)
    }

    // Sort products
    const sorted = [...filtered]
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price)
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating)
      case 'newest':
      default:
        return sorted.sort((a, b) => new Date(b.id) - new Date(a.id))
    }
  }, [categoryProducts, searchQuery, priceRange, selectedBrands, selectedRatings, availabilityFilter, sortBy])

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([priceRangeData.min, priceRangeData.max])
    setSelectedBrands([])
    setSelectedRatings([])
    setAvailabilityFilter('all')
    dispatch(setSearchQuery(''))
  }

  // Toggle filter expansion
  const toggleFilter = (filterName) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }))
  }

  // Handle brand selection
  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
  }

  // Handle rating selection
  const handleRatingToggle = (rating) => {
    setSelectedRatings(prev => 
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    )
  }

  if (!categoryDetails) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="pt-20 text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link href="/categories" className="text-primary-600 hover:text-primary-700">
            Back to Categories
          </Link>
        </div>
      </div>
    )
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
              <Link 
                href="/categories"
                className="inline-flex items-center gap-2 text-primary-200 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Categories
              </Link>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {categoryDetails.name}
              </h1>
              <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                {categoryDetails.description}
              </p>
              <div className="mt-6 text-primary-200">
                <p>{categoryProducts.length} products available</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="bg-white border-b border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={`Search ${categoryDetails.name.toLowerCase()}...`}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Sliders className="w-4 h-4" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Advanced Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-gray-200"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Price Range Filter */}
                    <div className="lg:col-span-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">Price Range</h3>
                        <button
                          onClick={() => toggleFilter('price')}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {expandedFilters.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                      <AnimatePresence>
                        {expandedFilters.price && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3"
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                value={priceRange[0]}
                                onChange={(e) => setPriceRange([parseFloat(e.target.value), priceRange[1]])}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                placeholder="Min"
                              />
                              <span className="text-gray-500">-</span>
                              <input
                                type="number"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                placeholder="Max"
                              />
                            </div>
                            <div className="text-xs text-gray-600">
                              Range: ${priceRangeData.min} - ${priceRangeData.max}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Brand Filter */}
                    <div className="lg:col-span-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">Brands</h3>
                        <button
                          onClick={() => toggleFilter('brands')}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {expandedFilters.brands ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                      <AnimatePresence>
                        {expandedFilters.brands && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2 max-h-32 overflow-y-auto"
                          >
                            {availableBrands.map((brand) => (
                              <label key={brand} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={selectedBrands.includes(brand)}
                                  onChange={() => handleBrandToggle(brand)}
                                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                />
                                <span className="text-sm text-gray-700">{brand}</span>
                              </label>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Rating Filter */}
                    <div className="lg:col-span-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">Rating</h3>
                        <button
                          onClick={() => toggleFilter('ratings')}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {expandedFilters.ratings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                      <AnimatePresence>
                        {expandedFilters.ratings && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2"
                          >
                            {[5, 4, 3, 2, 1].map((rating) => (
                              <label key={rating} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={selectedRatings.includes(rating)}
                                  onChange={() => handleRatingToggle(rating)}
                                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                />
                                <div className="flex items-center gap-1">
                                  {[...Array(rating)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                                  ))}
                                  <span className="text-sm text-gray-700">& up</span>
                                </div>
                              </label>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Active Filters Display */}
                  {(selectedBrands.length > 0 || selectedRatings.length > 0 || availabilityFilter !== 'all') && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-medium text-gray-700">Active Filters:</span>
                        <button
                          onClick={resetFilters}
                          className="text-sm text-primary-600 hover:text-primary-700 underline"
                        >
                          Clear All
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedBrands.map((brand) => (
                          <span key={brand} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            Brand: {brand}
                            <button
                              onClick={() => handleBrandToggle(brand)}
                              className="ml-1 hover:text-blue-900"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                        {selectedRatings.map((rating) => (
                          <span key={rating} className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                            {rating}+ Stars
                            <button
                              onClick={() => handleRatingToggle(rating)}
                              className="ml-1 hover:text-yellow-900"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                        {availabilityFilter !== 'all' && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            {availabilityFilter === 'in-stock' ? 'In Stock' : 'Out of Stock'}
                            <button
                              onClick={() => setAvailabilityFilter('all')}
                              className="ml-1 hover:text-green-900"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Results Count */}
        <section className="bg-white py-4 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                Showing {filteredAndSortedProducts.length} of {categoryProducts.length} products in {categoryDetails.name}
              </p>
              <div className="text-sm text-gray-500">
                Price range: ${priceRange[0]} - ${priceRange[1]}
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedProducts.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">{item.title.charAt(0)}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                          {item.title}
                        </h3>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Brand */}
                      <div className="flex items-center mb-3">
                        <span className="text-lg mr-2">{brandService.getBrandLogo(item.brand)}</span>
                        <span className="text-sm font-medium text-gray-700">{item.brand}</span>
                      </div>

                      {/* Rating */}
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
                        <span className="text-sm text-gray-600">({item.reviews})</span>
                      </div>

                      {/* Price and Actions */}
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
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
