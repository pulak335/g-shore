import brandsData from '../data/brands.json'

class BrandService {
  constructor() {
    this.brands = brandsData
  }

  // Get all brands
  getAllBrands() {
    return this.brands
  }

  // Get brand by name
  getBrandByName(brandName) {
    return this.brands.find(brand => brand.name === brandName)
  }

  // Get brand by ID
  getBrandById(brandId) {
    return this.brands.find(brand => brand.id === brandId)
  }

  // Get brands by category
  getBrandsByCategory(category) {
    return this.brands.filter(brand => brand.category === category)
  }

  // Get brand logo by name
  getBrandLogo(brandName) {
    const brand = this.getBrandByName(brandName)
    return brand ? brand.logo : '🏷️' // Default logo
  }

  // Get brand description by name
  getBrandDescription(brandName) {
    const brand = this.getBrandByName(brandName)
    return brand ? brand.description : 'Quality products'
  }

  // Get popular brands (top 6 by category)
  getPopularBrands() {
    const popularBrands = []
    const categories = [...new Set(this.brands.map(brand => brand.category))]
    
    categories.forEach(category => {
      const categoryBrands = this.getBrandsByCategory(category)
      if (categoryBrands.length > 0) {
        popularBrands.push(categoryBrands[0]) // Take first brand from each category
      }
    })
    
    return popularBrands.slice(0, 6) // Return top 6
  }

  // Search brands by name
  searchBrands(query) {
    const lowercaseQuery = query.toLowerCase()
    return this.brands.filter(brand => 
      brand.name.toLowerCase().includes(lowercaseQuery) ||
      brand.description.toLowerCase().includes(lowercaseQuery)
    )
  }

  // Get unique categories from brands
  getBrandCategories() {
    return [...new Set(this.brands.map(brand => brand.category))]
  }
}

export default new BrandService()
