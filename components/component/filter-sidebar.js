'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

export default function FilterSidebar({ categories, onCategoryFilter }) {
  const [expandedCategories, setExpandedCategories] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null)
      onCategoryFilter(null)
    } else {
      setSelectedCategory(category)
      onCategoryFilter(category)
    }
  }

  const clearFilters = () => {
    setSelectedCategory(null)
    onCategoryFilter(null)
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {selectedCategory && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Clear
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6">
        <button
          onClick={() => setExpandedCategories(!expandedCategories)}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Categories
          {expandedCategories ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {expandedCategories && (
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center space-x-2 cursor-pointer hover:text-primary-600"
              >
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category.name}
                  onChange={() => handleCategoryClick(category.name)}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm">{category.name}</span>
                <span className="text-xs text-gray-500">({category.count || 0})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer hover:text-primary-600">
            <input type="checkbox" className="text-primary-600 focus:ring-primary-500" />
            <span className="text-sm">Under $20</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer hover:text-primary-600">
            <input type="checkbox" className="text-primary-600 focus:ring-primary-500" />
            <span className="text-sm">$20 - $50</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer hover:text-primary-600">
            <input type="checkbox" className="text-primary-600 focus:ring-primary-500" />
            <span className="text-sm">$50 - $100</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer hover:text-primary-600">
            <input type="checkbox" className="text-primary-600 focus:ring-primary-500" />
            <span className="text-sm">Over $100</span>
          </label>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center space-x-2 cursor-pointer hover:text-primary-600"
            >
              <input type="checkbox" className="text-primary-600 focus:ring-primary-500" />
              <span className="text-sm">{rating}+ Stars</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Availability</h4>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer hover:text-primary-600">
            <input type="checkbox" className="text-primary-600 focus:ring-primary-500" />
            <span className="text-sm">In Stock</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer hover:text-primary-600">
            <input type="checkbox" className="text-primary-600 focus:ring-primary-500" />
            <span className="text-sm">Featured</span>
          </label>
        </div>
      </div>
    </div>
  )
}
