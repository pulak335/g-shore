'use client'

import { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { setItems } from '../../../store/slices/glossary-slice'
import { addToCart } from '../../../store/slices/cart-slice'
import itemsData from '../../../data/glossary-items.json'
import Header from '../../../components/layout/header'
import Footer from '../../../components/layout/footer'
import { 
  ShoppingCart, 
  Star, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  ArrowLeft, 
  Tag,
  Package,
  Clock,
  CheckCircle,
  Minus,
  Plus
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import brandService from '../../../services/brand-service'

export default function ProductPage() {
  const params = useParams()
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.glossary)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    // Load data if not already loaded
    if (items.length === 0) {
      dispatch(setItems(itemsData))
    }
  }, [dispatch, items.length])

  // Get product details
  const product = useMemo(() => {
    return items.find(item => item.id === parseInt(params.id))
  }, [items, params.id])

  // Get related products (same category, different products)
  const relatedProducts = useMemo(() => {
    if (!product) return []
    return items
      .filter(item => item.category === product.category && item.id !== product.id)
      .slice(0, 4)
  }, [items, product])

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: quantity
    }))
  }

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1)
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="pt-20 text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/store" className="text-primary-600 hover:text-primary-700">
            Back to Store
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Breadcrumb */}
        <section className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-primary-600">Home</Link>
              <span>/</span>
              <Link href="/store" className="hover:text-primary-600">Store</Link>
              <span>/</span>
              <Link href={`/categories/${product.category}`} className="hover:text-primary-600">
                {product.category}
              </Link>
              <span>/</span>
              <span className="text-gray-900">{product.title}</span>
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                {/* Main Image */}
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                    <span className="text-white text-6xl font-bold">{product.title.charAt(0)}</span>
                  </div>
                </div>

                {/* Thumbnail Images */}
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((index) => (
                    <div
                      key={index}
                      className={`aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 ${
                        selectedImage === index - 1 ? 'border-primary-600' : 'border-transparent'
                      }`}
                      onClick={() => setSelectedImage(index - 1)}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-primary-300 to-primary-500 flex items-center justify-center">
                        <span className="text-white text-lg font-bold">{product.title.charAt(0)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Back Button */}
                <Link 
                  href={`/categories/${product.category}`}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to {product.category}
                </Link>

                {/* Product Title and Brand */}
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {product.title}
                  </h1>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{brandService.getBrandLogo(product.brand)}</span>
                    <p className="text-lg text-gray-600">by {product.brand}</p>
                  </div>
                  <p className="text-sm text-gray-500">{brandService.getBrandDescription(product.brand)}</p>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{product.rating}</span>
                  </div>
                  <span className="text-gray-600">({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="text-4xl font-bold text-primary-600">
                  ${product.price}
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-medium">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.content}</p>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quantity and Actions */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Quantity</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange('decrease')}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 text-lg font-semibold">{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange('increase')}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`p-3 rounded-lg border transition-colors ${
                        isWishlisted 
                          ? 'border-red-300 bg-red-50 text-red-600' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <Truck className="w-6 h-6 text-primary-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Fast Delivery</p>
                      <p className="text-sm text-gray-600">Same day delivery</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-primary-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Quality Guaranteed</p>
                      <p className="text-sm text-gray-600">100% satisfaction</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="w-6 h-6 text-primary-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Secure Packaging</p>
                      <p className="text-sm text-gray-600">Safe delivery</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
              
              {relatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <Link href={`/product/${item.id}`}>
                        <div className="aspect-video bg-gray-100 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">{item.title.charAt(0)}</span>
                          </div>
                        </div>
                      </Link>

                      <div className="p-4">
                        <Link href={`/product/${item.id}`}>
                          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2 hover:text-primary-600">
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
                          <div className="text-lg font-bold text-primary-600">
                            ${item.price}
                          </div>
                          <button
                            onClick={() => dispatch(addToCart({
                              id: item.id,
                              title: item.title,
                              price: item.price,
                              image: item.image,
                              quantity: 1
                            }))}
                            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No related products found</p>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      </main>

    </div>
  )
}
