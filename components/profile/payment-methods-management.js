'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  Plus, 
  Edit, 
  Trash2, 
  Star,
  Shield,
  Calendar,
  X,
  Check
} from 'lucide-react'
import paymentService from '../../services/payment-service'
import Toast from '../ui/toast'

export default function PaymentMethodsManagement({ userId = '1' }) {
  const [paymentMethods, setPaymentMethods] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingMethod, setEditingMethod] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')

  const [formData, setFormData] = useState({
    cardType: 'Visa',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    isDefault: false,
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    }
  })

  useEffect(() => {
    loadPaymentMethods()
  }, [userId])

  const loadPaymentMethods = () => {
    setLoading(true)
    setTimeout(() => {
      const userMethods = paymentService.getUserPaymentCards(userId)
      setPaymentMethods(userMethods)
      setLoading(false)
    }, 500)
  }

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const validation = paymentService.validatePaymentCard(formData)
    if (!validation.isValid) {
      setToastMessage(validation.errors.join(', '))
      setToastType('error')
      setShowToast(true)
      return
    }

    if (editingMethod) {
      const updated = paymentService.updatePaymentCard(editingMethod.id, formData)
      if (updated) {
        setToastMessage('Payment method updated successfully!')
        setToastType('success')
        setShowToast(true)
        setEditingMethod(null)
      }
    } else {
      const added = paymentService.addPaymentCard({ ...formData, userId })
      if (added) {
        setToastMessage('Payment method added successfully!')
        setToastType('success')
        setShowToast(true)
      }
    }

    loadPaymentMethods()
    resetForm()
  }

  const handleEdit = (method) => {
    setFormData({
      cardType: method.cardType,
      cardNumber: method.cardNumber,
      cardName: method.cardName,
      expiryDate: method.expiryDate,
      cvv: method.cvv,
      isDefault: method.isDefault,
      billingAddress: { ...method.billingAddress }
    })
    setEditingMethod(method)
    setShowAddForm(true)
  }

  const handleDelete = (methodId) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      const deleted = paymentService.deletePaymentCard(methodId)
      if (deleted) {
        setToastMessage('Payment method deleted successfully!')
        setToastType('success')
        setShowToast(true)
        loadPaymentMethods()
      }
    }
  }

  const handleSetDefault = (methodId) => {
    const updated = paymentService.setDefaultPaymentCard(userId, methodId)
    if (updated) {
      setToastMessage('Default payment method updated!')
      setToastType('success')
      setShowToast(true)
      loadPaymentMethods()
    }
  }

  const resetForm = () => {
    setFormData({
      cardType: 'Visa',
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      isDefault: false,
      billingAddress: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States'
      }
    })
    setShowAddForm(false)
    setEditingMethod(null)
  }

  const getCardIcon = (cardType) => {
    switch (cardType.toLowerCase()) {
      case 'visa': return '💳'
      case 'mastercard': return '💳'
      case 'american express': return '💳'
      case 'discover': return '💳'
      default: return '💳'
    }
  }

  const getCardTypeColor = (cardType) => {
    switch (cardType.toLowerCase()) {
      case 'visa': return 'bg-blue-100 text-blue-800'
      case 'mastercard': return 'bg-red-100 text-red-800'
      case 'american express': return 'bg-green-100 text-green-800'
      case 'discover': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCardNumber = (cardNumber) => {
    return paymentService.formatCardNumberForDisplay(cardNumber)
  }

  const detectCardType = (cardNumber) => {
    return paymentService.detectCardType(cardNumber)
  }

  if (showAddForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingMethod ? 'Edit Payment Method' : 'Add New Payment Method'}
          </h2>
          <button
            onClick={resetForm}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Card Type</label>
              <select
                value={formData.cardType}
                onChange={(e) => handleInputChange('cardType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
                <option value="American Express">American Express</option>
                <option value="Discover">Discover</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => {
                  const value = e.target.value
                  const detectedType = detectCardType(value)
                  if (detectedType !== 'Unknown') {
                    handleInputChange('cardType', detectedType)
                  }
                  handleInputChange('cardNumber', value)
                }}
                placeholder="4111 1111 1111 1111"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
              <input
                type="text"
                value={formData.cardName}
                onChange={(e) => handleInputChange('cardName', e.target.value)}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
              <input
                type="text"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                placeholder="MM/YY"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
            <input
              type="text"
              value={formData.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value)}
              placeholder="123"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
              <input
                type="text"
                value={formData.billingAddress.street}
                onChange={(e) => handleInputChange('billingAddress.street', e.target.value)}
                placeholder="123 Main Street"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={formData.billingAddress.city}
                  onChange={(e) => handleInputChange('billingAddress.city', e.target.value)}
                  placeholder="New York"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  value={formData.billingAddress.state}
                  onChange={(e) => handleInputChange('billingAddress.state', e.target.value)}
                  placeholder="NY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                <input
                  type="text"
                  value={formData.billingAddress.zipCode}
                  onChange={(e) => handleInputChange('billingAddress.zipCode', e.target.value)}
                  placeholder="10001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isDefault"
              checked={formData.isDefault}
              onChange={(e) => handleInputChange('isDefault', e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="isDefault" className="text-sm text-gray-700">
              Set as default payment method
            </label>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              {editingMethod ? 'Update Payment Method' : 'Add Payment Method'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Payment Method
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment methods...</p>
        </div>
      ) : paymentMethods.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Payment Methods Saved</h3>
          <p className="text-gray-600 mb-6">Add your first payment method for faster checkout.</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <Plus className="w-4 h-4" />
            Add Payment Method
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCardTypeColor(method.cardType)}`}>
                    <span className="text-lg">{getCardIcon(method.cardType)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{method.cardType}</h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getCardTypeColor(method.cardType)}`}>
                      {method.cardType}
                    </span>
                  </div>
                </div>
                
                {method.isDefault && (
                  <div className="flex items-center gap-1 text-yellow-600">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-medium">Default</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{formatCardNumber(method.cardNumber)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">{method.cardName}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">Expires {method.expiryDate}</span>
                </div>
              </div>

              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Billing Address:</span> {method.billingAddress.street}, {method.billingAddress.city}, {method.billingAddress.state} {method.billingAddress.zipCode}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(method)}
                  className="flex items-center gap-2 px-3 py-1.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <Edit className="w-3 h-3" />
                  Edit
                </button>
                
                {!method.isDefault && (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="flex items-center gap-2 px-3 py-1.5 text-yellow-700 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors text-sm"
                  >
                    <Star className="w-3 h-3" />
                    Set Default
                  </button>
                )}
                
                <button
                  onClick={() => handleDelete(method.id)}
                  className="flex items-center gap-2 px-3 py-1.5 text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors text-sm"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-blue-900">Security & Privacy</h4>
            <p className="text-sm text-blue-700 mt-1">
              Your payment information is encrypted and secure. We never store your full card number or CVV.
            </p>
          </div>
        </div>
      </div>

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
