import paymentCardsData from '../data/payment-cards.json'

class PaymentService {
  constructor() {
    this.paymentCards = [...paymentCardsData]
  }

  // Get all payment cards for a user
  getUserPaymentCards(userId) {
    return this.paymentCards.filter(card => card.userId === userId)
  }

  // Get payment card by ID
  getPaymentCardById(id) {
    return this.paymentCards.find(card => card.id === id)
  }

  // Get default payment card for a user
  getDefaultPaymentCard(userId) {
    return this.paymentCards.find(card => card.userId === userId && card.isDefault)
  }

  // Add a new payment card
  addPaymentCard(cardData) {
    const newCard = {
      id: `CARD${String(this.paymentCards.length + 1).padStart(3, '0')}`,
      ...cardData,
      status: 'active',
      lastUsed: new Date().toISOString()
    }
    
    // If this is set as default, remove default from other cards
    if (newCard.isDefault) {
      this.paymentCards.forEach(card => {
        if (card.userId === newCard.userId) {
          card.isDefault = false
        }
      })
    }
    
    this.paymentCards.push(newCard)
    return newCard
  }

  // Update payment card
  updatePaymentCard(id, updates) {
    const cardIndex = this.paymentCards.findIndex(card => card.id === id)
    if (cardIndex !== -1) {
      this.paymentCards[cardIndex] = {
        ...this.paymentCards[cardIndex],
        ...updates
      }
      
      // If setting as default, remove default from other cards
      if (updates.isDefault) {
        this.paymentCards.forEach(card => {
          if (card.userId === this.paymentCards[cardIndex].userId && card.id !== id) {
            card.isDefault = false
          }
        })
      }
      
      return this.paymentCards[cardIndex]
    }
    return null
  }

  // Delete payment card
  deletePaymentCard(id) {
    const cardIndex = this.paymentCards.findIndex(card => card.id === id)
    if (cardIndex !== -1) {
      const deletedCard = this.paymentCards.splice(cardIndex, 1)[0]
      return deletedCard
    }
    return null
  }

  // Set default payment card
  setDefaultPaymentCard(userId, cardId) {
    // Remove default from all user's cards
    this.paymentCards.forEach(card => {
      if (card.userId === userId) {
        card.isDefault = false
      }
    })
    
    // Set new default
    const card = this.paymentCards.find(card => card.id === cardId && card.userId === userId)
    if (card) {
      card.isDefault = true
      return card
    }
    return null
  }

  // Validate payment card data
  validatePaymentCard(cardData) {
    const errors = []

    if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, '').length < 13) {
      errors.push('Card number is required and must be at least 13 digits')
    }
    
    if (!cardData.cardName || cardData.cardName.trim().length < 2) {
      errors.push('Cardholder name is required')
    }
    
    if (!cardData.expiryDate || !/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
      errors.push('Expiry date must be in MM/YY format')
    }
    
    if (!cardData.cvv || !/^\d{3,4}$/.test(cardData.cvv)) {
      errors.push('CVV must be 3-4 digits')
    }

    // Check if expiry date is in the future
    if (cardData.expiryDate) {
      const [month, year] = cardData.expiryDate.split('/')
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1)
      const now = new Date()
      
      if (expiryDate < now) {
        errors.push('Card has expired')
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // Detect card type from number
  detectCardType(cardNumber) {
    const number = cardNumber.replace(/\s/g, '')
    
    if (/^4/.test(number)) {
      return 'Visa'
    } else if (/^5[1-5]/.test(number)) {
      return 'Mastercard'
    } else if (/^3[47]/.test(number)) {
      return 'American Express'
    } else if (/^6(?:011|5)/.test(number)) {
      return 'Discover'
    } else if (/^3[0689]/.test(number)) {
      return 'Diners Club'
    } else if (/^35/.test(number)) {
      return 'JCB'
    }
    
    return 'Unknown'
  }

  // Format card number for display (show only last 4 digits)
  formatCardNumberForDisplay(cardNumber) {
    const cleaned = cardNumber.replace(/\s/g, '')
    return `**** **** **** ${cleaned.slice(-4)}`
  }

  // Test card numbers for different scenarios
  getTestCardNumbers() {
    return {
      visa: {
        valid: '4111 1111 1111 1111',
        declined: '4000 0000 0000 0002',
        insufficientFunds: '4000 0000 0000 9995'
      },
      mastercard: {
        valid: '5555 5555 5555 4444',
        declined: '2223 0000 0000 0001'
      },
      amex: {
        valid: '3782 822463 10005',
        declined: '3714 496353 98431'
      },
      discover: {
        valid: '6011 1111 1111 1117'
      }
    }
  }

  // Get payment statistics for a user
  getUserPaymentStats(userId) {
    const userCards = this.getUserPaymentCards(userId)
    const activeCards = userCards.filter(card => card.status === 'active')
    const expiredCards = userCards.filter(card => card.status === 'expired')
    const declinedCards = userCards.filter(card => card.status === 'declined')
    
    return {
      totalCards: userCards.length,
      activeCards: activeCards.length,
      expiredCards: expiredCards.length,
      declinedCards: declinedCards.length,
      hasDefaultCard: userCards.some(card => card.isDefault)
    }
  }
}

const paymentService = new PaymentService()
export default paymentService
