import { FC, useEffect, useState } from 'react'

/**
 * @description Render the childrens only when in the browser.
 */
const ClientOnly: FC = ({ children }) => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  if (!isClient) return null
  return <>{children}</>
}

export default ClientOnly
