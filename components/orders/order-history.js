'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  Star,
  Eye,
  RotateCcw,
  Calendar,
  MapPin,
  CreditCard,
  Search,
  Filter,
  XCircle
} from 'lucide-react'
import Link from 'next/link'
import orderService from '../../services/order-service'
import ReturnRequestForm from '../returns/return-request-form'
import OrderDetailsModal from './order-details-modal'
import RatingModal from './rating-modal'
import Toast from '../ui/toast'

export default function OrderHistory({ userId = '1' }) {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showReturnForm, setShowReturnForm] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')

  useEffect(() => {
    loadOrders()
  }, [userId])

  useEffect(() => {
    filterOrders()
  }, [orders, searchQuery, statusFilter])

  const loadOrders = () => {
    setLoading(true)
    setTimeout(() => {
      const userOrders = orderService.getUserOrders(userId)
      setOrders(userOrders)
      setLoading(false)
    }, 1000)
  }

  const filterOrders = () => {
    let filtered = orders

    // Search filter
    if (searchQuery) {
      filtered = orderService.searchOrders(userId, searchQuery)
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    // Sort by date (newest first)
    filtered = filtered.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))

    setFilteredOrders(filtered)
  }

  const handleReturnRequest = (order) => {
    setSelectedOrder(order)
    setShowReturnForm(true)
  }

  const handleViewDetails = (order) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
  }

  const handleCancelOrder = (order) => {
    if (window.confirm(`Are you sure you want to cancel order #${order.id}? This action cannot be undone.`)) {
      const cancelled = orderService.cancelOrder(order.id, 'Customer requested cancellation')
      if (cancelled) {
        setToastMessage('Order cancelled successfully!')
        setToastType('success')
        setShowToast(true)
        loadOrders()
      } else {
        setToastMessage('Unable to cancel order. Please contact support.')
        setToastType('error')
        setShowToast(true)
      }
    }
  }

  const handleRatingSubmit = (orderId, itemRatings) => {
    // Update ratings for each item
    itemRatings.forEach(({ itemId, rating }) => {
      orderService.rateOrderItem(orderId, itemId, rating)
    })

    // Reload orders to show updated ratings
    loadOrders()
    
    setShowRatingModal(false)
    setToastMessage('Thank you for rating your order!')
    setToastType('success')
    setShowToast(true)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusInfo = (status) => {
    return orderService.getOrderStatusInfo(status)
  }

  const getOrderStats = () => {
    return orderService.getOrderStats(userId)
  }

  const stats = getOrderStats()

  if (showReturnForm) {
    return (
      <ReturnRequestForm 
        onClose={() => setShowReturnForm(false)}
        prefillOrder={selectedOrder}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Delivered</p>
              <p className="text-xl font-bold text-gray-900">{stats.deliveredOrders}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xl font-bold text-gray-900">{stats.pendingOrders}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-xl font-bold text-gray-900">${stats.totalSpent.toFixed(2)}</p>
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
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || statusFilter !== 'all' 
                ? 'No orders match your search criteria.' 
                : 'You haven\'t placed any orders yet.'
              }
            </p>
            <Link
              href="/store"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          filteredOrders.map((order, index) => {
            const statusInfo = getStatusInfo(order.status)
            const canReturn = orderService.canReturnOrder(order.id)
            const canCancel = orderService.canCancelOrder(order.id)
            
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        <span>{statusInfo.icon}</span>
                        {statusInfo.label}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Ordered: {formatDate(order.orderDate)}</span>
                      </div>
                      
                      {order.deliveryDate && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Delivered: {formatDate(order.deliveryDate)}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CreditCard className="w-4 h-4" />
                        <span>{order.paymentMethod.type} •••• {order.paymentMethod.lastFour}</span>
                      </div>
                    </div>
                    
                    {/* Items Preview */}
                    <div className="flex items-center gap-2 mb-4">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''} • ${order.total.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {order.items.slice(0, 3).map((item) => (
                        <span key={item.id} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {item.name} (×{item.quantity})
                        </span>
                      ))}
                      {order.items.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          +{order.items.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    
                    {canCancel && (
                      <button
                        onClick={() => handleCancelOrder(order)}
                        className="flex items-center gap-2 px-4 py-2 text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel Order
                      </button>
                    )}
                    
                    {order.status === 'delivered' && !order.isRated && (
                      <button
                        onClick={() => handleRateOrder(order)}
                        className="flex items-center gap-2 px-4 py-2 text-yellow-700 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors"
                      >
                        <Star className="w-4 h-4" />
                        Rate Order
                      </button>
                    )}
                    
                    {canReturn && (
                      <button
                        onClick={() => handleReturnRequest(order)}
                        className="flex items-center gap-2 px-4 py-2 text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Return Request
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Tracking Info */}
                {order.trackingNumber && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Truck className="w-4 h-4" />
                      <span>Tracking: {order.trackingNumber}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })
        )}
      </div>

      {/* Modals */}
      {showOrderDetails && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setShowOrderDetails(false)}
        />
      )}
      
      {showRatingModal && selectedOrder && (
        <RatingModal
          order={selectedOrder}
          onClose={() => setShowRatingModal(false)}
          onSubmit={handleRatingSubmit}
        />
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
