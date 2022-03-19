type NavLinkProperties = {
  name: string
  href: string
}
type NavTypes = 'user' | 'merchant' | 'regular'
type NavLink = Record<NavTypes, NavLinkProperties[]>

export const navLinks: NavLink = {
  user: [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Cart',
      href: '/profile#cart',
    },
    {
      name: 'Profile',
      href: '/profile',
    },
  ],
  merchant: [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Overview',
      href: '/merchant/dashboard',
    },
  ],
  regular: [
    {
      name: 'Login',
      href: '/auth/login',
    },
    {
      name: 'Signup',
      href: '/auth/signup?as=user',
    },
    {
      name: 'Signup as Merchant',
      href: '/auth/signup?as=merchant',
    },
  ],
}
