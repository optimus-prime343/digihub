import { ReactNode, useEffect, useState } from 'react'

interface Props {
  children: ReactNode
}
export const ClientOnly = ({ children }: Props) => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  if (!isClient) return null
  return <>{children}</>
}
