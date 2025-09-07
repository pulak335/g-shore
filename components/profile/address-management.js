'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Plus, 
  Edit, 
  Trash2, 
  Star,
  Home,
  Building,
  Mail,
  Phone,
  X,
  Check
} from 'lucide-react'
import addressService from '../../services/address-service'
import Toast from '../ui/toast'

export default function AddressManagement({ userId = '1' }) {
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')

  const [formData, setFormData] = useState({
    type: 'home',
    label: '',
    address: {
      street: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    contactInfo: {
      name: '',
      phone: '',
      email: ''
    },
    deliveryInstructions: '',
    isDefault: false
  })

  useEffect(() => {
    loadAddresses()
  }, [userId])

  const loadAddresses = () => {
    setLoading(true)
    setTimeout(() => {
      const userAddresses = addressService.getUserAddresses(userId)
      setAddresses(userAddresses)
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
    
    const validation = addressService.validateAddress(formData)
    if (!validation.isValid) {
      setToastMessage(validation.errors.join(', '))
      setToastType('error')
      setShowToast(true)
      return
    }

    if (editingAddress) {
      const updated = addressService.updateAddress(editingAddress.id, formData)
      if (updated) {
        setToastMessage('Address updated successfully!')
        setToastType('success')
        setShowToast(true)
        setEditingAddress(null)
      }
    } else {
      const added = addressService.addAddress({ ...formData, userId })
      if (added) {
        setToastMessage('Address added successfully!')
        setToastType('success')
        setShowToast(true)
      }
    }

    loadAddresses()
    resetForm()
  }

  const handleEdit = (address) => {
    setFormData({
      type: address.type,
      label: address.label,
      address: { ...address.address },
      contactInfo: { ...address.contactInfo },
      deliveryInstructions: address.deliveryInstructions,
      isDefault: address.isDefault
    })
    setEditingAddress(address)
    setShowAddForm(true)
  }

  const handleDelete = (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      const deleted = addressService.deleteAddress(addressId)
      if (deleted) {
        setToastMessage('Address deleted successfully!')
        setToastType('success')
        setShowToast(true)
        loadAddresses()
      }
    }
  }

  const handleSetDefault = (addressId) => {
    const updated = addressService.setDefaultAddress(userId, addressId)
    if (updated) {
      setToastMessage('Default address updated!')
      setToastType('success')
      setShowToast(true)
      loadAddresses()
    }
  }

  const resetForm = () => {
    setFormData({
      type: 'home',
      label: '',
      address: {
        street: '',
        apartment: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States'
      },
      contactInfo: {
        name: '',
        phone: '',
        email: ''
      },
      deliveryInstructions: '',
      isDefault: false
    })
    setShowAddForm(false)
    setEditingAddress(null)
  }

  const getAddressIcon = (type) => {
    switch (type) {
      case 'home': return <Home className="w-4 h-4" />
      case 'work': return <Building className="w-4 h-4" />
      default: return <MapPin className="w-4 h-4" />
    }
  }

  const getAddressTypeColor = (type) => {
    switch (type) {
      case 'home': return 'bg-green-100 text-green-800'
      case 'work': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (showAddForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingAddress ? 'Edit Address' : 'Add New Address'}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="home">Home</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
              <input
                type="text"
                value={formData.label}
                onChange={(e) => handleInputChange('label', e.target.value)}
                placeholder="e.g., My Home, Office"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
            <input
              type="text"
              value={formData.address.street}
              onChange={(e) => handleInputChange('address.street', e.target.value)}
              placeholder="123 Main Street"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Apartment/Suite (Optional)</label>
            <input
              type="text"
              value={formData.address.apartment}
              onChange={(e) => handleInputChange('address.apartment', e.target.value)}
              placeholder="Apt 4B, Suite 200"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                value={formData.address.city}
                onChange={(e) => handleInputChange('address.city', e.target.value)}
                placeholder="New York"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <input
                type="text"
                value={formData.address.state}
                onChange={(e) => handleInputChange('address.state', e.target.value)}
                placeholder="NY"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
              <input
                type="text"
                value={formData.address.zipCode}
                onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                placeholder="10001"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
              <input
                type="text"
                value={formData.contactInfo.name}
                onChange={(e) => handleInputChange('contactInfo.name', e.target.value)}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.contactInfo.phone}
                onChange={(e) => handleInputChange('contactInfo.phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.contactInfo.email}
                onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
                placeholder="john@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Instructions (Optional)</label>
            <textarea
              value={formData.deliveryInstructions}
              onChange={(e) => handleInputChange('deliveryInstructions', e.target.value)}
              placeholder="Leave at front door if no answer"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
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
              Set as default address
            </label>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              {editingAddress ? 'Update Address' : 'Add Address'}
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
        <h2 className="text-xl font-semibold text-gray-900">Saved Addresses</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Address
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading addresses...</p>
        </div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Addresses Saved</h3>
          <p className="text-gray-600 mb-6">Add your first address to get started with faster checkout.</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <Plus className="w-4 h-4" />
            Add Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address, index) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getAddressTypeColor(address.type)}`}>
                    {getAddressIcon(address.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{address.label || address.type}</h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getAddressTypeColor(address.type)}`}>
                      {address.type}
                    </span>
                  </div>
                </div>
                
                {address.isDefault && (
                  <div className="flex items-center gap-1 text-yellow-600">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-medium">Default</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p>{address.address.street}</p>
                    {address.address.apartment && <p>{address.address.apartment}</p>}
                    <p>{address.address.city}, {address.address.state} {address.address.zipCode}</p>
                    <p>{address.address.country}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{address.contactInfo.phone}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{address.contactInfo.email}</span>
                </div>
              </div>

              {address.deliveryInstructions && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Delivery Instructions:</span> {address.deliveryInstructions}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(address)}
                  className="flex items-center gap-2 px-3 py-1.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <Edit className="w-3 h-3" />
                  Edit
                </button>
                
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="flex items-center gap-2 px-3 py-1.5 text-yellow-700 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors text-sm"
                  >
                    <Star className="w-3 h-3" />
                    Set Default
                  </button>
                )}
                
                <button
                  onClick={() => handleDelete(address.id)}
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
