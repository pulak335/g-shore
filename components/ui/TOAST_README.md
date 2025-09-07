# Toast Notification System

## Overview
The toast notification system provides user feedback for various actions throughout the application. It displays temporary messages that automatically disappear after a specified duration.

## Components

### Toast Component
Located at `frontend/components/ui/toast.js`

**Features:**
- Auto-dismiss after specified duration (default: 3 seconds)
- Multiple types: success, error, info
- Animated entrance and exit using Framer Motion
- Manual close button
- Responsive design

**Props:**
- `message` (string): The text to display
- `type` (string): 'success', 'error', or 'info' (default: 'success')
- `duration` (number): Time in milliseconds before auto-dismiss (default: 3000)
- `onClose` (function): Callback when toast is closed

## Usage Examples

### Basic Usage
```javascript
import Toast from '../ui/toast'

const [showToast, setShowToast] = useState(false)
const [toastMessage, setToastMessage] = useState('')
const [toastType, setToastType] = useState('success')

// Show success toast
setToastMessage('Operation completed successfully!')
setToastType('success')
setShowToast(true)

// Show error toast
setToastMessage('Something went wrong!')
setToastType('error')
setShowToast(true)

// In JSX
{showToast && (
  <Toast
    message={toastMessage}
    type={toastType}
    duration={3000}
    onClose={() => setShowToast(false)}
  />
)}
```

## Integration Points

### 1. Authentication (AuthModal)
- **Login Success**: "Login successful! Welcome back."
- **Registration Success**: "Registration successful! Welcome to FreshGrocer."
- **Error**: Shows error messages from Redux state

### 2. Checkout Process (CheckoutModal)
- **Order Success**: "Order placed successfully! Thank you for your purchase."
- **Order Error**: "Failed to place order. Please try again."

### 3. User Profile (ProfilePage)
- **Profile Update**: "Profile updated successfully!"
- **Profile Error**: "Failed to update profile. Please try again."
- **Address Added**: "Address added successfully!"

## Styling

The toast uses Tailwind CSS classes and supports different color schemes based on the type:

- **Success**: Green background with green border and check icon
- **Error**: Red background with red border and X icon
- **Info**: Blue background with blue border and info icon

## Animation

Uses Framer Motion for smooth animations:
- **Entrance**: Scale from 0.3 to 1, slide down from -50px
- **Exit**: Scale to 0.3, slide up to -50px
- **Duration**: 0.3 seconds for both entrance and exit

## Best Practices

1. **Keep messages concise**: Toast messages should be brief and clear
2. **Use appropriate types**: Success for positive actions, error for failures
3. **Don't overuse**: Reserve for important user feedback
4. **Consistent positioning**: Always appears in top-right corner
5. **Accessibility**: Includes proper ARIA labels and keyboard navigation

## Future Enhancements

- Multiple toast stacking
- Custom positioning options
- Rich content support (images, buttons)
- Sound notifications
- Toast history/logging
