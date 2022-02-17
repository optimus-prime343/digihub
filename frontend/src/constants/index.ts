export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[!#$%&*?@^-]).{8,}$/

export const PHONE_NUMBER_REGEX =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\(\d{2,3}\\)[ \\-]*)|(\d{2,4})[ \\-]*)*?\d{3,4}?[ \\-]*\d{3,4}?$/

export const PASSWORD_WEAK_MESSAGE =
  'Password must be at least 8 characters long and contain at least one number, one uppercase letter,one special character and one lowercase letter'
