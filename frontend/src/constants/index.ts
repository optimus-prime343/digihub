export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[!#$%&*?@^-]).{8,}$/

export const PHONE_NUMBER_REGEX =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\(\d{2,3}\\)[ \\-]*)|(\d{2,4})[ \\-]*)*?\d{3,4}?[ \\-]*\d{3,4}?$/

export const PASSWORD_WEAK_MESSAGE =
  'Password must be at least 8 characters long and contain at least one number, one uppercase letter,one special character and one lowercase letter'

export const STRIPE_PUBLIC_KEY =
  'pk_test_51KAB9XCO8m1gZ84iEwOb7tJiPsKI22FKxVfRZ6ekhK42IEEKdA1MQP2TfX28p3VEmzfobhk3BPg0JJChGQaTdh1Z00XMoPAOFv'

export const PRODUCTS_PER_PAGE = 10
