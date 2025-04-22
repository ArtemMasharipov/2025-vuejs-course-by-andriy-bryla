export default {
  app: {
    title: 'E-Shop Demo'
  },
  nav: {
    home: 'Home',
    products: 'Products',
    cart: 'Cart',
    about: 'About',
    contacts: 'Contacts',
    admin: 'Admin'
  },
  auth: {
    login: 'Login',
    logout: 'Logout',
    googleSignIn: 'Sign in with Google',
    loginWithGoogle: 'Sign in with Google',
    loginSuccess: 'Successfully logged in',
    logoutSuccess: 'Successfully logged out'
  },
  home: {
    welcome: 'Welcome to E-Shop',
    subtitle: 'Your one-stop shop for all your needs',
    shopNow: 'Shop Now',
    features: {
      title: 'Our Features',
      cart: {
        title: 'Shopping Cart',
        desc: 'Add products to your cart and manage your shopping list with ease.'
      },
      i18n: {
        title: 'Multi-language Support',
        desc: 'Enjoy our application in English and Ukrainian languages.'
      },
      auth: {
        title: 'Secure Authentication',
        desc: 'Sign in securely with your Google account for a personalized experience.'
      }
    }
  },
  about: {
    title: 'About Us',
    description: 'This is a demo e-commerce application built with Vue.js and Firebase to showcase modern web development practices. It features a clean, responsive design and implements common e-commerce functionalities.',
    technologies: {
      title: 'Technologies Used',
      vue: 'Progressive JavaScript framework for building user interfaces',
      vuex: 'State management pattern and library for Vue.js applications',
      router: 'Official router for Vue.js to build single-page applications',
      vuetify: 'Material Design component framework for Vue.js',
      firebase: 'Google\'s platform for app development, authentication, and database',
      i18n: 'Internationalization plugin for Vue.js'
    },
    demo: {
      title: 'Demo Project',
      description: 'This project is for demonstration purposes only. All products, prices, and user data are fictional.',
      exploreProducts: 'Explore Our Products'
    }
  },
  products: {
    title: 'Products',
    details: 'Details',
    add: 'Add Product',
    edit: 'Edit Product',
    delete: 'Delete',
    confirmDelete: 'Confirm Delete',
    deleteConfirmMessage: 'Are you sure you want to delete this product?',
    backToProducts: 'Back to Products',
    noProducts: 'No products available',
    notFound: 'Product not found',
    addToCart: 'Add to Cart',
    addedToCart: 'Product added to cart',
    currency: '$',
    form: {
      title: 'Title',
      description: 'Description',
      price: 'Price',
      imageUrl: 'Image URL'
    },
    filters: 'Filters',
    searchByName: 'Search by product name',
    filterBySeller: 'Filter by seller',
    resetFilters: 'Reset filters',
    noSellersFound: 'No sellers found',
    filterByPrice: 'Filter by price',
    minPrice: 'Minimum price',
    maxPrice: 'Maximum price'
  },
  cart: {
    title: 'Shopping Cart',
    empty: 'Your cart is empty',
    continueShopping: 'Continue Shopping',
    summary: 'Order Summary',
    itemsCount: 'Items',
    total: 'Total',
    checkout: 'Checkout',
    clear: 'Clear Cart',
    confirmClear: 'Clear Cart?',
    clearConfirmMessage: 'Are you sure you want to remove all items from cart?',
    viewCart: 'View Cart',
    checkoutMessage: 'This is a demo app. Checkout is not implemented.'
  },
  contacts: {
    title: 'Contact Us',
    form: {
      title: 'Send Us a Message',
      name: 'Your Name',
      email: 'Your Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message'
    },
    info: {
      title: 'Contact Information',
      address: {
        title: 'Address',
        value: '123 E-Commerce St, Digital City, 10001'
      },
      phone: {
        title: 'Phone',
        value: '+1 (555) 123-4567'
      },
      email: {
        title: 'Email',
        value: 'info&#64;eshop-demo.com'
      },
      hours: {
        title: 'Working Hours',
        value: 'Monday - Friday: 9am - 5pm'
      }
    },
    map: {
      title: 'Our Location'
    },
    social: {
      title: 'Follow Us'
    },
    success: {
      title: 'Message Sent',
      message: 'Thank you for your message. We will get back to you as soon as possible.'
    }
  },
  admin: {
    title: 'Admin Panel',
    products: 'Manage Products',
    users: 'Manage Users',
    editUser: 'Edit User',
    displayName: 'Display Name',
    email: 'Email',
    role: 'Role',
    usersManagementDesc: 'Manage user roles and permissions.',
    addProduct: 'Add Product',
    noProducts: 'No products available',
    noProductsFound: 'No products found',
    productsManagement: 'Products Management',
    deleteConfirmation: 'Are you sure you want to delete this product?'
  },
  common: {
    save: 'Save',
    cancel: 'Cancel',
    back: 'Back',
    close: 'Close',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    delete: 'Delete',
    online: 'Connected',
    offline: 'Disconnected - Click to retry',
    search: 'Search'
  },
  validation: {
    required: 'This field is required',
    email: 'Please enter a valid email',
    url: 'Please enter a valid URL',
    number: 'Please enter a valid number',
    min: 'Value must be at least {min}',
    max: 'Value must be less than {max}',
    minLength: 'Must be at least {min} characters'
  },
  errors: {
    returnHome: 'Return to Home Page',
    notFound: 'Page Not Found',
    serverError: 'Server Error'
  },
  toast: {
    success: {
      default: 'Operation completed successfully',
      productAdded: 'Product added successfully',
      productUpdated: 'Product updated successfully',
      productDeleted: 'Product deleted successfully',
      userUpdated: 'User updated successfully',
      loggedIn: 'Successfully logged in',
      loggedOut: 'Successfully logged out',
      messageSent: 'Message sent successfully',
      cartUpdated: 'Cart updated successfully',
      itemAdded: 'Item added to cart',
      itemRemoved: 'Item removed from cart',
      cartCleared: 'Cart cleared successfully',
      welcome: 'Welcome, {name}!',
      deleteSuccess: 'Successfully deleted'
    },
    error: {
      default: 'An error occurred',
      login: 'Login failed',
      notAuthorized: 'You are not authorized to perform this action',
      productNotFound: 'Product not found',
      productUpdateFailed: 'Failed to update product',
      productDeleteFailed: 'Failed to delete product',
      cartUpdateFailed: 'Failed to update cart',
      messageSendFailed: 'Failed to send message',
      networkError: 'Network error, please try again',
      userDataFailed: 'Failed to get user data',
      error: 'Failed to add product to cart'
    },
    info: {
      default: 'Information',
      processing: 'Processing your request',
      loggedOut: 'You have been logged out',
      cartSynchronized: 'Cart has been synchronized. {message}'
    },
    warning: {
      default: 'Warning',
      unsavedChanges: 'You have unsaved changes',
      lowStock: 'This product is running low on stock',
      connectionIssue: 'Connection issues detected'
    }
  }
}