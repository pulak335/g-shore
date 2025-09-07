import addressesData from '../data/addresses.json'

class AddressService {
  constructor() {
    this.addresses = [...addressesData]
  }

  // Get all addresses for a user
  getUserAddresses(userId) {
    return this.addresses.filter(address => address.userId === userId)
  }

  // Get address by ID
  getAddressById(id) {
    return this.addresses.find(address => address.id === id)
  }

  // Get default address for a user
  getDefaultAddress(userId) {
    return this.addresses.find(address => address.userId === userId && address.isDefault)
  }

  // Add a new address
  addAddress(addressData) {
    const newAddress = {
      id: `ADDR${String(this.addresses.length + 1).padStart(3, '0')}`,
      ...addressData,
      createdAt: new Date().toISOString(),
      lastUsed: null
    }
    
    // If this is set as default, remove default from other addresses
    if (newAddress.isDefault) {
      this.addresses.forEach(address => {
        if (address.userId === newAddress.userId) {
          address.isDefault = false
        }
      })
    }
    
    this.addresses.push(newAddress)
    return newAddress
  }

  // Update address
  updateAddress(id, updates) {
    const addressIndex = this.addresses.findIndex(address => address.id === id)
    if (addressIndex !== -1) {
      this.addresses[addressIndex] = {
        ...this.addresses[addressIndex],
        ...updates
      }
      
      // If setting as default, remove default from other addresses
      if (updates.isDefault) {
        this.addresses.forEach(address => {
          if (address.userId === this.addresses[addressIndex].userId && address.id !== id) {
            address.isDefault = false
          }
        })
      }
      
      return this.addresses[addressIndex]
    }
    return null
  }

  // Delete address
  deleteAddress(id) {
    const addressIndex = this.addresses.findIndex(address => address.id === id)
    if (addressIndex !== -1) {
      const deletedAddress = this.addresses.splice(addressIndex, 1)[0]
      return deletedAddress
    }
    return null
  }

  // Set default address
  setDefaultAddress(userId, addressId) {
    // Remove default from all user's addresses
    this.addresses.forEach(address => {
      if (address.userId === userId) {
        address.isDefault = false
      }
    })
    
    // Set new default
    const address = this.addresses.find(address => address.id === addressId && address.userId === userId)
    if (address) {
      address.isDefault = true
      return address
    }
    return null
  }

  // Validate address data
  validateAddress(addressData) {
    const errors = []

    if (!addressData.address?.street || addressData.address.street.trim().length < 5) {
      errors.push('Street address is required and must be at least 5 characters')
    }
    
    if (!addressData.address?.city || addressData.address.city.trim().length < 2) {
      errors.push('City is required')
    }
    
    if (!addressData.address?.state || addressData.address.state.trim().length < 2) {
      errors.push('State is required')
    }
    
    if (!addressData.address?.zipCode || !/^\d{5}(-\d{4})?$/.test(addressData.address.zipCode)) {
      errors.push('Valid ZIP code is required')
    }
    
    if (!addressData.contactInfo?.name || addressData.contactInfo.name.trim().length < 2) {
      errors.push('Contact name is required')
    }
    
    if (!addressData.contactInfo?.phone || !/^\+?[\d\s\-\(\)]+$/.test(addressData.contactInfo.phone)) {
      errors.push('Valid phone number is required')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // Format address for display
  formatAddress(address) {
    const { street, apartment, city, state, zipCode, country } = address.address
    let formatted = street
    if (apartment) formatted += `, ${apartment}`
    formatted += `, ${city}, ${state} ${zipCode}, ${country}`
    return formatted
  }

  // Get address statistics
  getAddressStats(userId) {
    const userAddresses = this.getUserAddresses(userId)
    const defaultAddress = this.getDefaultAddress(userId)
    
    return {
      totalAddresses: userAddresses.length,
      hasDefaultAddress: !!defaultAddress,
      addressTypes: [...new Set(userAddresses.map(addr => addr.type))]
    }
  }
}

const addressService = new AddressService()
export default addressService
