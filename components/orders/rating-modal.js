'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Star, Package } from 'lucide-react'

export default function RatingModal({ order, onClose, onSubmit }) {
  const [ratings, setRatings] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRatingChange = (itemId, rating) => {
    setRatings(prev => ({
      ...prev,
      [itemId]: rating
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Convert ratings object to array format
    const itemRatings = Object.entries(ratings).map(([itemId, rating]) => ({
      itemId: parseInt(itemId),
      rating: rating
    }))
    
    await onSubmit(order.id, itemRatings)
    setIsSubmitting(false)
  }

  const isAllRated = order.items.every(item => ratings[item.id] > 0)

  const StarRating = ({ itemId, currentRating, onRatingChange }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRatingChange(itemId, star)}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 transition-colors ${
                star <= currentRating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300 hover:text-yellow-200'
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Rate Your Order</h2>
              <p className="text-gray-600">Order #{order.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Please rate each item in your order. Your feedback helps us improve our service.
            </p>
          </div>

          <div className="space-y-6">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 font-bold text-lg">
                    {item.name.charAt(0)}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 mb-1">{item.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">Quantity: {item.quantity}</p>
                  <p className="text-sm font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm text-gray-600">Rate this item:</span>
                  <StarRating
                    itemId={item.id}
                    currentRating={ratings[item.id] || 0}
                    onRatingChange={handleRatingChange}
                  />
                  {ratings[item.id] && (
                    <span className="text-xs text-gray-500">
                      {ratings[item.id] === 1 && 'Poor'}
                      {ratings[item.id] === 2 && 'Fair'}
                      {ratings[item.id] === 3 && 'Good'}
                      {ratings[item.id] === 4 && 'Very Good'}
                      {ratings[item.id] === 5 && 'Excellent'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Overall Rating */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Overall Order Experience</h3>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">How was your overall experience?</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRatings(prev => ({ ...prev, overall: star }))}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        star <= (ratings.overall || 0)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 hover:text-yellow-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={!isAllRated || isSubmitting}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                <Star className="w-4 h-4" />
                Submit Rating
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
