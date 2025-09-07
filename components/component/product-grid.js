'use client'

import { motion } from 'framer-motion'
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/slices/cart-slice'
import Link from 'next/link'

export default function ProductGrid({ items, viewMode = 'grid' }) {
  const dispatch = useDispatch()

  const handleAddToCart = (item) => {
    dispatch(addToCart(item))
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center space-x-6">
              {/* Image */}
              <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="text-primary-600 text-2xl font-bold">
                  {item.title.charAt(0)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="inline-block bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                      {item.category}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-3">
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
                      <span className="text-sm text-gray-600 ml-2">
                        {item.rating} ({item.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex flex-col items-end space-y-3 ml-4">
                    <div className="text-2xl font-bold text-primary-600">
                      ${item.price}
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        href={`/item/${item.id}`}
                        className="btn btn-outline btn-sm flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Link>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="btn btn-primary btn-sm flex items-center"
                        disabled={!item.inStock}
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            {!item.inStock && (
              <div className="mt-3 text-sm text-red-600 font-medium">
                Out of Stock
              </div>
            )}
          </motion.div>
        ))}
      </div>
    )
  }

  // Grid view
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="card overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          {/* Image */}
          <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
            <div className="text-primary-600 text-4xl font-bold">
              {item.title.charAt(0)}
            </div>
          </div>

          <div className="p-6">
            {/* Category Badge */}
            <div className="inline-block bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-0.5 rounded-full mb-3">
              {item.category}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {item.description}
            </p>

            {/* Rating */}
            <div className="flex items-center mb-4">
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
              <span className="text-sm text-gray-600 ml-2">
                {item.rating} ({item.reviews} reviews)
              </span>
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
              <div className="flex space-x-2">
                <Link
                  href={`/item/${item.id}`}
                  className="btn btn-outline btn-sm flex items-center"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Link>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="btn btn-primary btn-sm flex items-center"
                  disabled={!item.inStock}
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Stock Status */}
            {!item.inStock && (
              <div className="mt-3 text-sm text-red-600 font-medium">
                Out of Stock
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
