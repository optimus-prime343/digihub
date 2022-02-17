import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'

export interface NextLinkProperties extends HTMLAttributes<HTMLAnchorElement> {
  href: string
}

const NextLink: FC<NextLinkProperties> = ({ href, children, ...rest }) => {
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  )
}
export default NextLink
