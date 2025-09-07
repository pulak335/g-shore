import wishlistData from '../data/wishlist.json'

class WishlistService {
  constructor() {
    this.wishlist = [...wishlistData]
  }

  // Get all wishlist items for a user
  getUserWishlist(userId) {
    return this.wishlist.filter(item => item.userId === userId)
  }

  // Get wishlist item by ID
  getWishlistItemById(id) {
    return this.wishlist.find(item => item.id === id)
  }

  // Check if item is in wishlist
  isInWishlist(userId, itemId) {
    return this.wishlist.some(item => item.userId === userId && item.itemId === itemId)
  }

  // Add item to wishlist
  addToWishlist(userId, itemData) {
    // Check if already in wishlist
    if (this.isInWishlist(userId, itemData.itemId)) {
      return null // Already exists
    }

    const newItem = {
      id: `WISH${String(this.wishlist.length + 1).padStart(3, '0')}`,
      userId,
      ...itemData,
      addedAt: new Date().toISOString(),
      isAvailable: true,
      isOnSale: false,
      originalPrice: null,
      discount: 0
    }
    
    this.wishlist.push(newItem)
    return newItem
  }

  // Remove item from wishlist
  removeFromWishlist(userId, itemId) {
    const itemIndex = this.wishlist.findIndex(item => item.userId === userId && item.itemId === itemId)
    if (itemIndex !== -1) {
      const removedItem = this.wishlist.splice(itemIndex, 1)[0]
      return removedItem
    }
    return null
  }

  // Update wishlist item
  updateWishlistItem(id, updates) {
    const itemIndex = this.wishlist.findIndex(item => item.id === id)
    if (itemIndex !== -1) {
      this.wishlist[itemIndex] = {
        ...this.wishlist[itemIndex],
        ...updates
      }
      return this.wishlist[itemIndex]
    }
    return null
  }

  // Clear wishlist for user
  clearWishlist(userId) {
    const userItems = this.wishlist.filter(item => item.userId === userId)
    this.wishlist = this.wishlist.filter(item => item.userId !== userId)
    return userItems
  }

  // Get wishlist statistics
  getWishlistStats(userId) {
    const userWishlist = this.getUserWishlist(userId)
    const availableItems = userWishlist.filter(item => item.isAvailable)
    const onSaleItems = userWishlist.filter(item => item.isOnSale)
    const totalValue = userWishlist.reduce((sum, item) => sum + item.itemPrice, 0)
    
    return {
      totalItems: userWishlist.length,
      availableItems: availableItems.length,
      onSaleItems: onSaleItems.length,
      totalValue,
      categories: [...new Set(userWishlist.map(item => item.itemCategory))]
    }
  }

  // Get items by category
  getWishlistByCategory(userId, category) {
    return this.getUserWishlist(userId).filter(item => item.itemCategory === category)
  }

  // Search wishlist
  searchWishlist(userId, query) {
    const userWishlist = this.getUserWishlist(userId)
    const searchTerm = query.toLowerCase()
    
    return userWishlist.filter(item => 
      item.itemName.toLowerCase().includes(searchTerm) ||
      item.itemCategory.toLowerCase().includes(searchTerm)
    )
  }

  // Get recently added items
  getRecentlyAdded(userId, limit = 5) {
    const userWishlist = this.getUserWishlist(userId)
    return userWishlist
      .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
      .slice(0, limit)
  }

  // Move item to cart (remove from wishlist and return item data)
  moveToCart(userId, itemId) {
    const item = this.wishlist.find(item => item.userId === userId && item.itemId === itemId)
    if (item) {
      this.removeFromWishlist(userId, itemId)
      return {
        id: item.itemId,
        name: item.itemName,
        price: item.itemPrice,
        image: item.itemImage,
        category: item.itemCategory,
        quantity: 1
      }
    }
    return null
  }
}

const wishlistService = new WishlistService()
export default wishlistService
