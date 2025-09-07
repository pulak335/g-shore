import ordersData from '../data/orders.json'

class OrderService {
  constructor() {
    this.orders = [...ordersData]
  }

  // Get all orders for a user
  getUserOrders(userId) {
    return this.orders.filter(order => order.userId === userId)
  }

  // Get order by ID
  getOrderById(id) {
    return this.orders.find(order => order.id === id)
  }

  // Get orders by status
  getOrdersByStatus(userId, status) {
    return this.orders.filter(order => order.userId === userId && order.status === status)
  }

  // Create a new order
  createOrder(orderData) {
    const newOrder = {
      id: `ORD${String(this.orders.length + 1).padStart(3, '0')}`,
      ...orderData,
      orderDate: new Date().toISOString(),
      status: 'processing',
      deliveryDate: null,
      trackingNumber: null,
      isRated: false,
      notes: 'Order placed successfully'
    }
    
    this.orders.push(newOrder)
    return newOrder
  }

  // Update order status
  updateOrderStatus(id, status, notes = '') {
    const order = this.getOrderById(id)
    if (order) {
      order.status = status
      order.notes = notes
      
      if (status === 'delivered') {
        order.deliveryDate = new Date().toISOString()
      }
      
      return order
    }
    return null
  }

  // Add tracking number
  addTrackingNumber(id, trackingNumber) {
    const order = this.getOrderById(id)
    if (order) {
      order.trackingNumber = trackingNumber
      order.status = 'shipped'
      order.notes = 'Package is on the way'
      return order
    }
    return null
  }

  // Rate an order item
  rateOrderItem(orderId, itemId, rating) {
    const order = this.getOrderById(orderId)
    if (order) {
      const item = order.items.find(item => item.id === itemId)
      if (item) {
        item.rating = rating
        
        // Check if all items are rated
        const allRated = order.items.every(item => item.rating > 0)
        order.isRated = allRated
        
        return order
      }
    }
    return null
  }

  // Get order statistics
  getOrderStats(userId) {
    const userOrders = this.getUserOrders(userId)
    const totalOrders = userOrders.length
    const deliveredOrders = userOrders.filter(order => order.status === 'delivered').length
    const pendingOrders = userOrders.filter(order => ['processing', 'shipped'].includes(order.status)).length
    const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0)
    
    return {
      totalOrders,
      deliveredOrders,
      pendingOrders,
      totalSpent,
      averageOrderValue: totalOrders > 0 ? totalSpent / totalOrders : 0
    }
  }

  // Get order status info
  getOrderStatusInfo(status) {
    const statusMap = {
      'processing': {
        label: 'Processing',
        color: 'bg-blue-100 text-blue-800',
        icon: '⏳',
        description: 'Your order is being prepared'
      },
      'shipped': {
        label: 'Shipped',
        color: 'bg-purple-100 text-purple-800',
        icon: '🚚',
        description: 'Your order is on the way'
      },
      'delivered': {
        label: 'Delivered',
        color: 'bg-green-100 text-green-800',
        icon: '✅',
        description: 'Your order has been delivered'
      },
      'cancelled': {
        label: 'Cancelled',
        color: 'bg-red-100 text-red-800',
        icon: '❌',
        description: 'Your order has been cancelled'
      }
    }
    
    return statusMap[status] || statusMap['processing']
  }

  // Check if order can be returned
  canReturnOrder(orderId) {
    const order = this.getOrderById(orderId)
    if (!order) return false
    
    // Can return if delivered and within 30 days
    if (order.status === 'delivered' && order.deliveryDate) {
      const deliveryDate = new Date(order.deliveryDate)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      
      return deliveryDate > thirtyDaysAgo
    }
    
    return false
  }

  // Check if order can be cancelled
  canCancelOrder(orderId) {
    const order = this.getOrderById(orderId)
    if (!order) return false
    
    // Can cancel if not delivered and not already cancelled
    return order.status !== 'delivered' && order.status !== 'cancelled'
  }

  // Cancel an order
  cancelOrder(orderId, reason = 'Customer requested cancellation') {
    const order = this.getOrderById(orderId)
    if (order && this.canCancelOrder(orderId)) {
      order.status = 'cancelled'
      order.notes = reason
      order.cancelledAt = new Date().toISOString()
      return order
    }
    return null
  }

  // Get recent orders
  getRecentOrders(userId, limit = 5) {
    const userOrders = this.getUserOrders(userId)
    return userOrders
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
      .slice(0, limit)
  }

  // Search orders
  searchOrders(userId, query) {
    const userOrders = this.getUserOrders(userId)
    const searchTerm = query.toLowerCase()
    
    return userOrders.filter(order => 
      order.id.toLowerCase().includes(searchTerm) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm)) ||
      order.status.toLowerCase().includes(searchTerm)
    )
  }
}

const orderService = new OrderService()
export default orderService
