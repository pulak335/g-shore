import usersData from '../data/users.json'

class UserService {
  constructor() {
    this.users = usersData
    this.currentUser = null
  }

  // Simulate API delay
  async delay(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Login user
  async login(email, password) {
    await this.delay(1000) // Simulate API call

    const user = this.users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password
    )

    if (!user) {
      throw new Error('Invalid email or password')
    }

    // Remove password from user object for security
    const { password: _, ...userWithoutPassword } = user
    
    // Update last login
    user.lastLogin = new Date().toISOString()
    
    this.currentUser = userWithoutPassword
    
    // Generate a simple token (in real app, use JWT)
    const token = `token_${user.id}_${Date.now()}`
    
    return {
      user: userWithoutPassword,
      token
    }
  }

  // Register new user
  async register(userData) {
    await this.delay(1000) // Simulate API call

    // Check if email already exists
    const existingUser = this.users.find(u => 
      u.email.toLowerCase() === userData.email.toLowerCase()
    )

    if (existingUser) {
      throw new Error('Email already registered')
    }

    // Create new user
    const newUser = {
      id: (this.users.length + 1).toString(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      addresses: [],
      orders: [],
      settings: {
        notifications: {
          orderUpdates: true,
          promotionalEmails: false
        },
        privacy: {
          profileVisibility: 'public'
        }
      },
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    }

    // Add to users array
    this.users.push(newUser)
    
    // Remove password from user object for security
    const { password: _, ...userWithoutPassword } = newUser
    
    this.currentUser = userWithoutPassword
    
    // Generate a simple token
    const token = `token_${newUser.id}_${Date.now()}`
    
    return {
      user: userWithoutPassword,
      token
    }
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser
  }

  // Update user profile
  async updateProfile(userId, updates) {
    await this.delay(500) // Simulate API call

    const userIndex = this.users.findIndex(u => u.id === userId)
    
    if (userIndex === -1) {
      throw new Error('User not found')
    }

    // Update user data
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updates,
      lastLogin: new Date().toISOString()
    }

    // Update current user if it's the same user
    if (this.currentUser && this.currentUser.id === userId) {
      const { password: _, ...userWithoutPassword } = this.users[userIndex]
      this.currentUser = userWithoutPassword
    }

    return this.users[userIndex]
  }

  // Add address to user
  async addAddress(userId, addressData) {
    await this.delay(500) // Simulate API call

    const userIndex = this.users.findIndex(u => u.id === userId)
    
    if (userIndex === -1) {
      throw new Error('User not found')
    }

    const newAddress = {
      id: (this.users[userIndex].addresses.length + 1).toString(),
      ...addressData,
      isDefault: this.users[userIndex].addresses.length === 0 // First address is default
    }

    this.users[userIndex].addresses.push(newAddress)

    // Update current user if it's the same user
    if (this.currentUser && this.currentUser.id === userId) {
      this.currentUser.addresses = this.users[userIndex].addresses
    }

    return newAddress
  }

  // Update address
  async updateAddress(userId, addressId, updates) {
    await this.delay(500) // Simulate API call

    const userIndex = this.users.findIndex(u => u.id === userId)
    
    if (userIndex === -1) {
      throw new Error('User not found')
    }

    const addressIndex = this.users[userIndex].addresses.findIndex(a => a.id === addressId)
    
    if (addressIndex === -1) {
      throw new Error('Address not found')
    }

    this.users[userIndex].addresses[addressIndex] = {
      ...this.users[userIndex].addresses[addressIndex],
      ...updates
    }

    // Update current user if it's the same user
    if (this.currentUser && this.currentUser.id === userId) {
      this.currentUser.addresses = this.users[userIndex].addresses
    }

    return this.users[userIndex].addresses[addressIndex]
  }

  // Delete address
  async deleteAddress(userId, addressId) {
    await this.delay(500) // Simulate API call

    const userIndex = this.users.findIndex(u => u.id === userId)
    
    if (userIndex === -1) {
      throw new Error('User not found')
    }

    this.users[userIndex].addresses = this.users[userIndex].addresses.filter(
      a => a.id !== addressId
    )

    // Update current user if it's the same user
    if (this.currentUser && this.currentUser.id === userId) {
      this.currentUser.addresses = this.users[userIndex].addresses
    }

    return { success: true }
  }

  // Add order to user
  async addOrder(userId, orderData) {
    await this.delay(500) // Simulate API call

    const userIndex = this.users.findIndex(u => u.id === userId)
    
    if (userIndex === -1) {
      throw new Error('User not found')
    }

    const newOrder = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'processing',
      ...orderData
    }

    this.users[userIndex].orders.unshift(newOrder) // Add to beginning

    // Update current user if it's the same user
    if (this.currentUser && this.currentUser.id === userId) {
      this.currentUser.orders = this.users[userIndex].orders
    }

    return newOrder
  }

  // Update user settings
  async updateSettings(userId, settings) {
    await this.delay(500) // Simulate API call

    const userIndex = this.users.findIndex(u => u.id === userId)
    
    if (userIndex === -1) {
      throw new Error('User not found')
    }

    this.users[userIndex].settings = {
      ...this.users[userIndex].settings,
      ...settings
    }

    // Update current user if it's the same user
    if (this.currentUser && this.currentUser.id === userId) {
      this.currentUser.settings = this.users[userIndex].settings
    }

    return this.users[userIndex].settings
  }

  // Logout user
  async logout() {
    await this.delay(300) // Simulate API call
    
    this.currentUser = null
    return { success: true }
  }

  // Get user by ID
  async getUserById(userId) {
    await this.delay(300) // Simulate API call

    const user = this.users.find(u => u.id === userId)
    
    if (!user) {
      throw new Error('User not found')
    }

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  // Get user orders
  async getUserOrders(userId) {
    await this.delay(300) // Simulate API call

    const user = this.users.find(u => u.id === userId)
    
    if (!user) {
      throw new Error('User not found')
    }

    return user.orders
  }

  // Get user addresses
  async getUserAddresses(userId) {
    await this.delay(300) // Simulate API call

    const user = this.users.find(u => u.id === userId)
    
    if (!user) {
      throw new Error('User not found')
    }

    return user.addresses
  }

  // Get user settings
  async getUserSettings(userId) {
    await this.delay(300) // Simulate API call

    const user = this.users.find(u => u.id === userId)
    
    if (!user) {
      throw new Error('User not found')
    }

    return user.settings
  }
}

// Create singleton instance
const userService = new UserService()

export default userService
