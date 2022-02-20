import { NextLink } from '@/components/core'

interface Props {
  navButton: (pathname: string) => string
}
const UserNavbar = ({ navButton }: Props) => {
  return (
    <>
      {navLinks.map(({ href, name }) => (
        <li className={navButton(href)} key={name}>
          <NextLink href={href}>{name}</NextLink>
        </li>
      ))}
    </>
  )
}
const navLinks = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Profile',
    href: '/profile',
  },
]
export default UserNavbar
