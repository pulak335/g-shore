'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  Search,
  Filter,
  Star,
  Tag,
  Package,
  Eye
} from 'lucide-react'
import Link from 'next/link'
import wishlistService from '../../services/wishlist-service'
import Toast from '../ui/toast'

export default function WishlistManagement({ userId = '1' }) {
  const [wishlistItems, setWishlistItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')

  useEffect(() => {
    loadWishlist()
  }, [userId])

  useEffect(() => {
    filterItems()
  }, [wishlistItems, searchQuery, categoryFilter])

  const loadWishlist = () => {
    setLoading(true)
    setTimeout(() => {
      const userWishlist = wishlistService.getUserWishlist(userId)
      setWishlistItems(userWishlist)
      setLoading(false)
    }, 500)
  }

  const filterItems = () => {
    let filtered = wishlistItems

    // Search filter
    if (searchQuery) {
      filtered = wishlistService.searchWishlist(userId, searchQuery)
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.itemCategory === categoryFilter)
    }

    setFilteredItems(filtered)
  }

  const handleRemoveFromWishlist = (itemId) => {
    const removed = wishlistService.removeFromWishlist(userId, itemId)
    if (removed) {
      setToastMessage('Item removed from wishlist!')
      setToastType('success')
      setShowToast(true)
      loadWishlist()
    }
  }

  const handleMoveToCart = (itemId) => {
    const cartItem = wishlistService.moveToCart(userId, itemId)
    if (cartItem) {
      setToastMessage('Item moved to cart!')
      setToastType('success')
      setShowToast(true)
      loadWishlist()
    }
  }

  const getWishlistStats = () => {
    return wishlistService.getWishlistStats(userId)
  }

  const getCategories = () => {
    const stats = getWishlistStats()
    return stats.categories
  }

  const stats = getWishlistStats()

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-xl font-bold text-gray-900">{stats.totalItems}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Available</p>
              <p className="text-xl font-bold text-gray-900">{stats.availableItems}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Tag className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">On Sale</p>
              <p className="text-xl font-bold text-gray-900">{stats.onSaleItems}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-xl font-bold text-gray-900">${stats.totalValue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search wishlist items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {getCategories().map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading wishlist...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Items Found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || categoryFilter !== 'all' 
                ? 'No items match your search criteria.' 
                : 'Your wishlist is empty. Start adding items you love!'
              }
            </p>
            <Link
              href="/store"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {item.itemCategory}
                    </span>
                    {item.isOnSale && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                        Sale
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleRemoveFromWishlist(item.itemId)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                  </button>
                </div>

                <div className="w-full h-32 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-primary-600 font-bold text-2xl">
                    {item.itemName.charAt(0)}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {item.itemName}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-primary-600">
                    ${item.itemPrice.toFixed(2)}
                  </span>
                  {item.isOnSale && item.originalPrice && (
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-500 line-through">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-medium">
                        -{item.discount}%
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-gray-500">
                    Added {new Date(item.addedAt).toLocaleDateString()}
                  </span>
                  {!item.isAvailable && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                      Out of Stock
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/product/${item.itemId}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Link>
                  
                  {item.isAvailable && (
                    <button
                      onClick={() => handleMoveToCart(item.itemId)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {wishlistItems.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-blue-900">Quick Actions</h4>
              <p className="text-sm text-blue-700 mt-1">
                Move all available items to cart or clear your wishlist
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const availableItems = wishlistItems.filter(item => item.isAvailable)
                  availableItems.forEach(item => wishlistService.moveToCart(userId, item.itemId))
                  setToastMessage(`${availableItems.length} items moved to cart!`)
                  setToastType('success')
                  setShowToast(true)
                  loadWishlist()
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Move All to Cart
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear your wishlist?')) {
                    wishlistService.clearWishlist(userId)
                    setToastMessage('Wishlist cleared!')
                    setToastType('success')
                    setShowToast(true)
                    loadWishlist()
                  }
                }}
                className="px-4 py-2 text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
              >
                Clear Wishlist
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}
