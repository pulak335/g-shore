# Brand System Documentation

## Overview
The brand system provides a comprehensive way to manage and display brand information across the FreshGrocer application. Each product is associated with a brand, and brands have logos, descriptions, and category associations.

## Files

### `brands.json`
Contains brand data with the following structure:
```json
{
  "id": "1",
  "name": "FreshCo",
  "logo": "🍎",
  "category": "Fruits & Vegetables",
  "description": "Premium organic fruits and vegetables"
}
```

### `brand-service.js`
Service class that provides methods to:
- Get all brands
- Get brand by name or ID
- Get brands by category
- Get brand logo and description
- Get popular brands
- Search brands

## Brand Categories

### Fruits & Vegetables
- **FreshCo** 🍎 - Premium organic fruits and vegetables
- **OrganicLife** 🌱 - 100% organic produce

### Meat & Fish
- **OceanFresh** 🐟 - Fresh seafood and premium meats
- **FarmFresh** 🚜 - Farm-to-table fresh meat

### Cooking
- **KitchenPro** 🍳 - Professional cooking essentials
- **SpiceMaster** 🌶️ - Premium spices and seasonings

### Beverages
- **PureWater** 💧 - Natural spring water and beverages
- **JuiceBar** 🥤 - Fresh juices and smoothies

### Home & Cleaning
- **CleanHome** 🧽 - Eco-friendly cleaning products
- **EcoClean** 🌿 - Eco-friendly cleaning solutions

### Pest Control
- **SafeGuard** 🛡️ - Safe and effective pest control

### Stationery & Office
- **OfficeMax** 📝 - Quality office supplies

### Beauty Products
- **BeautyGlow** ✨ - Natural beauty and skincare
- **NaturalBeauty** 🌸 - Natural beauty products

### Health Products
- **HealthPlus** 💊 - Natural health supplements
- **VitaHealth** 💪 - Vitamins and wellness products

### Pet Care
- **PetCare** 🐕 - Premium pet food and care

### Kitchen Appliances
- **KitchenTech** ⚡ - Modern kitchen appliances
- **SmartHome** 🏠 - Smart home appliances

### Baby Care
- **BabyCare** 👶 - Gentle baby care products

## Integration

### Product Display
Brands are displayed in:
- Product cards with logo and name
- Product details page with logo, name, and description
- Store page with brand filtering
- Category pages with brand information
- Home page sections with brand logos

### Brand Filtering
Users can filter products by brand in:
- Store page advanced filters
- Category page filters
- Search functionality includes brand names

### Brand Service Methods

```javascript
// Get brand logo
brandService.getBrandLogo('FreshCo') // Returns 🍎

// Get brand description
brandService.getBrandDescription('FreshCo') // Returns "Premium organic fruits and vegetables"

// Get brands by category
brandService.getBrandsByCategory('Fruits & Vegetables')

// Get popular brands
brandService.getPopularBrands()

// Search brands
brandService.searchBrands('fresh')
```

## Product-Brand Association

All products in `glossary-items.json` now have a `brand` property that references one of the brands in `brands.json`. This creates a consistent brand experience across the application.

## Future Enhancements

1. **Brand Pages**: Individual brand pages showing all products from a specific brand
2. **Brand Analytics**: Track brand performance and popularity
3. **Brand Partnerships**: Special deals and promotions by brand
4. **Brand Reviews**: Customer reviews specific to brands
5. **Brand Comparison**: Compare products across different brands
