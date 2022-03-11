import Link from 'next/link'
import React, { HTMLAttributes, ReactNode } from 'react'

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  href: string
  children: ReactNode
}

const NextLink = ({ href, children, ...rest }: Props) => {
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  )
}

export default NextLink
