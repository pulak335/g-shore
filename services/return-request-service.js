import returnRequestsData from '../data/return-requests.json'

class ReturnRequestService {
  constructor() {
    this.returnRequests = [...returnRequestsData]
  }

  // Get all return requests for a user
  getUserReturnRequests(userId) {
    return this.returnRequests.filter(request => request.userId === userId)
  }

  // Get return request by ID
  getReturnRequestById(id) {
    return this.returnRequests.find(request => request.id === id)
  }

  // Create a new return request
  createReturnRequest(requestData) {
    const newRequest = {
      id: `RR${String(this.returnRequests.length + 1).padStart(3, '0')}`,
      ...requestData,
      status: 'pending',
      requestDate: new Date().toISOString(),
      resolutionDate: null,
      attachments: requestData.attachments || []
    }
    
    this.returnRequests.push(newRequest)
    return newRequest
  }

  // Update return request status
  updateReturnRequestStatus(id, status, resolutionDate = null) {
    const request = this.getReturnRequestById(id)
    if (request) {
      request.status = status
      if (resolutionDate) {
        request.resolutionDate = resolutionDate
      }
      return request
    }
    return null
  }

  // Get return request statistics
  getReturnStats() {
    const total = this.returnRequests.length
    const pending = this.returnRequests.filter(r => r.status === 'pending').length
    const approved = this.returnRequests.filter(r => r.status === 'approved').length
    const rejected = this.returnRequests.filter(r => r.status === 'rejected').length

    return {
      total,
      pending,
      approved,
      rejected,
      approvalRate: total > 0 ? (approved / total) * 100 : 0
    }
  }

  // Get common return reasons
  getReturnReasons() {
    return [
      { value: 'defective', label: 'Product Defective/Damaged' },
      { value: 'wrong_item', label: 'Wrong Item Received' },
      { value: 'not_as_described', label: 'Not as Described' },
      { value: 'quality_issue', label: 'Quality Issue' },
      { value: 'expired', label: 'Product Expired' },
      { value: 'size_issue', label: 'Wrong Size' },
      { value: 'other', label: 'Other' }
    ]
  }

  // Validate return request data
  validateReturnRequest(data) {
    const errors = []

    if (!data.userId) {
      errors.push('User ID is required')
    }
    if (!data.orderId) {
      errors.push('Order ID is required')
    }
    if (!data.productId) {
      errors.push('Product ID is required')
    }
    if (!data.reason) {
      errors.push('Return reason is required')
    }
    if (!data.description || data.description.trim().length < 10) {
      errors.push('Description must be at least 10 characters')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}

const returnRequestService = new ReturnRequestService()
export default returnRequestService
