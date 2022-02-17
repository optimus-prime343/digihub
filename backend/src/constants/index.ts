export const PASSWORD_REGEX =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[!#$%&*?@^-]).{8,}$/

export const API_GLOBAL_PREFIX = '/api/v1'
export const PORT = process.env.PORT ?? 4000

export const PASSWORD_WEAK_MESSAGE = [
    'Password must be at least 8 characters long',
    'Password must contain at least one uppercase letter',
    'Password must contain at least one lowercase letter',
    'Password must contain at least one number',
    'Password must contain at least one special character',
]
export const PASSWORD_DONOT_MATCH_MESSAGE =
    'Password and passwordConfirm do not match'

export const PRODUCT_NOT_FOUND_MESSAGE = 'Product not found'
export const CART_NOT_FOUND = 'Cart not found'

export const COOKIE_EXPIRATION_DATE = new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000
)
export const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24
