'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, ArrowRight, CreditCard, Truck, CheckCircle, ShoppingCart, Plus, Minus, Tag, Check, XCircle } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart, updateQuantity, removeFromCart, applyPromoCode, removePromoCode } from '../../store/slices/cart-slice'
import userService from '../../services/user-service'
import Toast from '../ui/toast'

const steps = [
  { id: 1, name: 'Cart Review', icon: ShoppingCart },
  { id: 2, name: 'Shipping', icon: Truck },
  { id: 3, name: 'Payment', icon: CreditCard },
  { id: 4, name: 'Confirmation', icon: CheckCircle }
]

export default function CheckoutModal({ isOpen, onClose, onOpenAuth }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  })
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })
  const [orderComplete, setOrderComplete] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')
  const [promoCode, setPromoCode] = useState('')
  const [promoCodeError, setPromoCodeError] = useState('')

  const dispatch = useDispatch()
  const { items, total, originalTotal, totalSavings, promoCode: appliedPromoCode, promoDiscountAmount } = useSelector((state) => state.cart)
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  const handleNext = () => {
    // Check if user is authenticated before proceeding to shipping step
    if (currentStep === 1 && !isAuthenticated) {
      setToastMessage('Please login to continue with checkout')
      setToastType('info')
      setShowToast(true)
      setTimeout(() => {
        onClose() // Close checkout modal
        if (onOpenAuth) {
          onOpenAuth() // Open auth modal
        }
      }, 2000)
      return
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleShippingChange = (e) => {
    const { name, value } = e.target
    setShippingInfo(prev => ({ ...prev, [name]: value }))
  }

  const handlePaymentChange = (e) => {
    const { name, value } = e.target
    setPaymentInfo(prev => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = async () => {
    try {
      if (!isAuthenticated) {
        setToastMessage('Please login to place your order')
        setToastType('info')
        setShowToast(true)
        setTimeout(() => {
          onClose() // Close checkout modal
          if (onOpenAuth) {
            onOpenAuth() // Open auth modal
          }
        }, 2000)
        return
      }

      if (user) {
        // Create order in user service
        const orderData = {
          total: total,
          items: items,
          shippingInfo: shippingInfo,
          paymentInfo: {
            cardNumber: paymentInfo.cardNumber.slice(-4), // Only store last 4 digits
            cardName: paymentInfo.cardName
          }
        }
        
        await userService.addOrder(user.id, orderData)
      }
      
      dispatch(clearCart())
      setOrderComplete(true)
      setCurrentStep(4)
      
      // Show success toast
      setToastMessage('Order placed successfully! Thank you for your purchase.');
      setToastType('success');
      setShowToast(true);
    } catch (error) {
      console.error('Error placing order:', error)
      // Show error toast
      setToastMessage('Failed to place order. Please try again.');
      setToastType('error');
      setShowToast(true);
    }
  }

  const handleLoginPrompt = () => {
    setShowLoginPrompt(false)
    onClose() // Close checkout modal to show login modal
  }

  // Promo code validation and application
  const validatePromoCode = (code) => {
    const validCodes = {
      'WELCOME25': { discount: 25, type: 'percentage' },
      'SAVE10': { discount: 10, type: 'percentage' },
      'FIRST5': { discount: 5, type: 'fixed' },
      'FREESHIP': { discount: 0, type: 'freeship' }
    }
    return validCodes[code.toUpperCase()]
  }

  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) {
      setPromoCodeError('Please enter a promo code')
      return
    }

    const promoData = validatePromoCode(promoCode.trim())
    
    if (!promoData) {
      setPromoCodeError('Invalid promo code')
      setToastMessage('Invalid promo code. Please try again.')
      setToastType('error')
      setShowToast(true)
      return
    }

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    let discountAmount = 0

    if (promoData.type === 'percentage') {
      discountAmount = (subtotal * promoData.discount) / 100
    } else if (promoData.type === 'fixed') {
      discountAmount = promoData.discount
    }

    dispatch(applyPromoCode({
      code: promoCode.trim().toUpperCase(),
      discount: promoData.discount,
      discountAmount: discountAmount
    }))

    setPromoCode('')
    setPromoCodeError('')
    setToastMessage(`Promo code "${promoCode.trim().toUpperCase()}" applied successfully!`)
    setToastType('success')
    setShowToast(true)
  }

  const handleRemovePromoCode = () => {
    dispatch(removePromoCode())
    setToastMessage('Promo code removed')
    setToastType('success')
    setShowToast(true)
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <CartReviewStep 
          items={items} 
          total={total} 
          originalTotal={originalTotal} 
          totalSavings={totalSavings}
          appliedPromoCode={appliedPromoCode}
          promoDiscountAmount={promoDiscountAmount}
          promoCode={promoCode}
          setPromoCode={setPromoCode}
          promoCodeError={promoCodeError}
          onApplyPromoCode={handleApplyPromoCode}
          onRemovePromoCode={handleRemovePromoCode}
        />
      case 2:
        return <ShippingStep shippingInfo={shippingInfo} onChange={handleShippingChange} />
      case 3:
        return <PaymentStep paymentInfo={paymentInfo} onChange={handlePaymentChange} />
      case 4:
        return <ConfirmationStep orderComplete={orderComplete} />
      default:
        return null
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
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
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      currentStep >= step.id ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      <step.icon className="w-4 h-4" />
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      currentStep >= step.id ? 'text-primary-600' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </span>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-4 ${
                        currentStep > step.id ? 'bg-primary-600' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {renderStepContent()}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex items-center gap-4">
                {currentStep === 1 && (
                  <div className="text-lg font-semibold text-gray-900">
                    {totalSavings > 0 ? (
                      <div className="text-right">
                        <div className="text-sm text-gray-500 line-through">${originalTotal.toFixed(2)}</div>
                        <div className="text-green-600">${total.toFixed(2)}</div>
                        <div className="text-xs text-green-600">Save ${totalSavings.toFixed(2)}</div>
                      </div>
                    ) : (
                      `Total: $${total.toFixed(2)}`
                    )}
                  </div>
                )}
                
                {currentStep === 3 ? (
                  <button
                    onClick={handlePlaceOrder}
                    className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Place Order
                  </button>
                ) : currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={onClose}
                    className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Continue Shopping
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  )
}

// Step Components
function CartReviewStep({ 
  items, 
  total, 
  originalTotal, 
  totalSavings, 
  appliedPromoCode, 
  promoDiscountAmount,
  promoCode,
  setPromoCode,
  promoCodeError,
  onApplyPromoCode,
  onRemovePromoCode
}) {
  const dispatch = useDispatch()
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')

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

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Review Your Cart</h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-primary-600 font-bold">{item.title.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-green-600">${item.price.toFixed(2)}</span>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <>
                        <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                        <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-medium">
                          -{item.discount}%
                        </span>
                      </>
                    )}
                    <span className="text-xs text-gray-500">each</span>
                  </div>
                </div>
              </div>
              
              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  
                  <span className="w-8 text-center font-medium text-gray-900">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                
                <div className="text-right min-w-[80px]">
                  <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Promo Code Section */}
        <div className="border-t pt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Promo Code</h4>
          
          {appliedPromoCode ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">
                    Promo code "{appliedPromoCode}" applied
                  </span>
                </div>
                <button
                  onClick={onRemovePromoCode}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
              <p className="text-green-700 text-sm mt-1">
                You saved ${promoDiscountAmount.toFixed(2)}
              </p>
            </div>
          ) : (
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {promoCodeError && (
                  <p className="text-red-600 text-sm mt-1">{promoCodeError}</p>
                )}
              </div>
              <button
                onClick={onApplyPromoCode}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                <Tag className="w-4 h-4" />
                Apply
              </button>
            </div>
          )}
          
          {/* Available Promo Codes */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Available codes:</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">WELCOME25</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">SAVE10</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">FIRST5</span>
            </div>
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          {totalSavings > 0 && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>Original Total:</span>
              <span className="line-through">${originalTotal.toFixed(2)}</span>
            </div>
          )}
          {totalSavings > 0 && (
            <div className="flex justify-between text-sm text-green-600 font-medium">
              <span>Product Savings:</span>
              <span>${totalSavings.toFixed(2)}</span>
            </div>
          )}
          {promoDiscountAmount > 0 && (
            <div className="flex justify-between text-sm text-blue-600 font-medium">
              <span>Promo Discount ({appliedPromoCode}):</span>
              <span>-${promoDiscountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={2000}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  )
}

function ShippingStep({ shippingInfo, onChange }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={shippingInfo.firstName}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={shippingInfo.lastName}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Doe"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={shippingInfo.email}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="john@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <input
          type="tel"
          name="phone"
          value={shippingInfo.phone}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="+1 (555) 123-4567"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <input
          type="text"
          name="address"
          value={shippingInfo.address}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="123 Main St"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <input
            type="text"
            name="city"
            value={shippingInfo.city}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="New York"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
          <input
            type="text"
            name="state"
            value={shippingInfo.state}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="NY"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
          <input
            type="text"
            name="zipCode"
            value={shippingInfo.zipCode}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="10001"
          />
        </div>
      </div>
    </div>
  )
}

function PaymentStep({ paymentInfo, onChange }) {
  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value)
    onChange({ target: { name: 'cardNumber', value: formatted } })
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={paymentInfo.cardNumber}
          onChange={handleCardNumberChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="1234 5678 9012 3456"
          maxLength="19"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
        <input
          type="text"
          name="cardName"
          value={paymentInfo.cardName}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="John Doe"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
          <input
            type="text"
            name="expiryDate"
            value={paymentInfo.expiryDate}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="MM/YY"
            maxLength="5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
          <input
            type="text"
            name="cvv"
            value={paymentInfo.cvv}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="123"
            maxLength="4"
          />
        </div>
      </div>
    </div>
  )
}

function ConfirmationStep({ orderComplete }) {
  return (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900">
        {orderComplete ? 'Order Placed Successfully!' : 'Order Confirmation'}
      </h3>
      <p className="text-gray-600">
        {orderComplete 
          ? 'Thank you for your order. You will receive a confirmation email shortly.'
          : 'Please review your order details before proceeding.'
        }
      </p>
      {orderComplete && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 text-sm">
            Order #: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
        </div>
      )}

    </div>
  )
}


    
