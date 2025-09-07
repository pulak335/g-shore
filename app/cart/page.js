'use client'

import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { removeFromCart, updateQuantity, clearCart } from '../../store/slices/cart-slice'
import Header from '../../components/layout/header'
import Footer from '../../components/layout/footer'
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Toast from '../../components/ui/toast'
import CheckoutModal from '../../components/checkout/checkout-modal'

export default function Cart() {
  const dispatch = useDispatch()
  const { items, total, originalTotal, totalSavings } = useSelector(state => state.cart)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(itemId))
      setToastMessage('Item removed from cart')
      setToastType('success')
      setShowToast(true)
    } else {
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity }))
      setToastMessage('Quantity updated')
      setToastType('success')
      setShowToast(true)
    }
  }

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId))
    setToastMessage('Item removed from cart')
    setToastType('success')
    setShowToast(true)
  }

  const handleClearCart = () => {
    dispatch(clearCart())
    setToastMessage('Cart cleared successfully')
    setToastType('success')
    setShowToast(true)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/store" className="btn btn-primary btn-lg">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Start Shopping
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">You have {items.length} item(s) in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Cart Items</h2>
                  <button
                    onClick={handleClearCart}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      {/* Image */}
                      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="text-primary-600 text-xl font-bold">
                          {item.title.charAt(0)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {item.category}
                        </p>
                        <div className="text-lg font-bold text-primary-600">
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
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Total */}
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {totalSavings > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Original Total</span>
                    <span className="font-medium line-through text-gray-500">${originalTotal.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between">
                    <span className="text-green-600">You Save</span>
                    <span className="font-medium text-green-600">${totalSavings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(total * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold text-primary-600">
                      ${(total * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setShowCheckoutModal(true)}
                className="w-full btn btn-primary btn-lg mb-4"
              >
                Proceed to Checkout
              </button>
              
              <Link href="/store" className="w-full btn btn-outline btn-lg">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}

      <CheckoutModal 
        isOpen={showCheckoutModal} 
        onClose={() => setShowCheckoutModal(false)}
        onOpenAuth={() => {
          // Since we're in the cart page, we need to redirect to home or show auth modal
          // For now, let's redirect to home where the auth modal is available
          window.location.href = '/'
        }}
      />
    </div>
  )
}
