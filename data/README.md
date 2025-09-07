# User Data & Authentication System

## Overview
This directory contains the user data and authentication system for the FreshGrocer application. The system uses local JSON data for development and includes a comprehensive user service for managing authentication, profiles, orders, and addresses.

## Files

### `users.json`
Contains sample user data with the following structure:

```json
{
  "id": "1",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1 (555) 123-4567",
  "addresses": [...],
  "orders": [...],
  "settings": {...},
  "createdAt": "2024-01-01T00:00:00Z",
  "lastLogin": "2024-01-20T10:30:00Z"
}
```

## Sample Users

### Test Accounts
You can use these accounts to test the authentication system:

1. **John Doe**
   - Email: `john@example.com`
   - Password: `password123`
   - Has 2 addresses and 2 orders

2. **Jane Smith**
   - Email: `jane@example.com`
   - Password: `password123`
   - Has 1 address and 1 order

3. **Mike Johnson**
   - Email: `mike@example.com`
   - Password: `password123`
   - Has 1 address and no orders

4. **Sarah Wilson**
   - Email: `sarah@example.com`
   - Password: `password123`
   - Has 1 address and 1 order

5. **David Brown**
   - Email: `david@example.com`
   - Password: `password123`
   - Has 1 address and no orders

## User Service

The `userService` provides the following functionality:

### Authentication
- `login(email, password)` - Authenticate user
- `register(userData)` - Register new user
- `logout()` - Logout user

### Profile Management
- `updateProfile(userId, updates)` - Update user profile
- `getCurrentUser()` - Get current authenticated user

### Address Management
- `addAddress(userId, addressData)` - Add new address
- `updateAddress(userId, addressId, updates)` - Update address
- `deleteAddress(userId, addressId)` - Delete address
- `getUserAddresses(userId)` - Get user addresses

### Order Management
- `addOrder(userId, orderData)` - Add new order
- `getUserOrders(userId)` - Get user orders

### Settings Management
- `updateSettings(userId, settings)` - Update user settings
- `getUserSettings(userId)` - Get user settings

## Data Structure

### User Object
```javascript
{
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string, // Only in data file, removed in service
  phone: string,
  addresses: Address[],
  orders: Order[],
  settings: UserSettings,
  createdAt: string, // ISO date string
  lastLogin: string  // ISO date string
}
```

### Address Object
```javascript
{
  id: string,
  type: 'Home' | 'Office' | 'Other',
  name: string,
  address: string,
  city: string,
  state: string,
  zipCode: string,
  phone: string,
  isDefault: boolean
}
```

### Order Object
```javascript
{
  id: string,
  date: string, // YYYY-MM-DD format
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled',
  total: number,
  items: OrderItem[],
  shippingInfo: object,
  paymentInfo: object
}
```

### User Settings Object
```javascript
{
  notifications: {
    orderUpdates: boolean,
    promotionalEmails: boolean
  },
  privacy: {
    profileVisibility: 'public' | 'private'
  }
}
```

## Integration with Redux

The authentication system integrates with Redux through the `auth-slice.js`:

### Actions
- `login(credentials)` - Async thunk for login
- `register(userData)` - Async thunk for registration
- `logoutUser()` - Async thunk for logout
- `updateProfile({ userId, updates })` - Async thunk for profile updates

### State
```javascript
{
  user: User | null,
  token: string | null,
  isAuthenticated: boolean,
  loading: boolean,
  error: string | null
}
```

## Security Notes

⚠️ **Important**: This is a development system using local data. In production:

1. Passwords should be hashed using bcrypt or similar
2. Use JWT tokens for authentication
3. Implement proper session management
4. Add rate limiting and security headers
5. Use HTTPS for all API calls
6. Implement proper input validation and sanitization

## Usage Examples

### Login
```javascript
import { useDispatch } from 'react-redux'
import { login } from '../store/slices/auth-slice'

const dispatch = useDispatch()
await dispatch(login({ email: 'john@example.com', password: 'password123' }))
```

### Register
```javascript
import { useDispatch } from 'react-redux'
import { register } from '../store/slices/auth-slice'

const dispatch = useDispatch()
await dispatch(register({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'password123',
  phone: '+1 (555) 123-4567'
}))
```

### Update Profile
```javascript
import { useDispatch } from 'react-redux'
import { updateProfile } from '../store/slices/auth-slice'

const dispatch = useDispatch()
await dispatch(updateProfile({
  userId: '1',
  updates: { firstName: 'Johnny', phone: '+1 (555) 999-8888' }
}))
```
