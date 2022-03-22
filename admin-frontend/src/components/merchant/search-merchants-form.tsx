import { TextInput } from '@mantine/core'
import Fuse from 'fuse.js'
import { BsSearch } from 'react-icons/bs'

import { IMerchant } from '../../typings/merchant'

interface Props {
  merchants: IMerchant[]
  onSearchComplete: (merchants: IMerchant[]) => void
}
export const SearchMerchantsForm = ({ merchants, onSearchComplete }: Props) => {
  const fuse = new Fuse(merchants, { keys: ['businessName,user.email'] })
  const handleSearch = (searchQuery: string) => {
    const results = fuse.search(searchQuery).map(result => result.item)
    onSearchComplete(results.length > 0 ? results : merchants)
  }
  return (
    <TextInput
      className='mb-4 ml-auto max-w-md'
      placeholder='Search merchant'
      icon={<BsSearch />}
      onChange={event => handleSearch(event.currentTarget.value)}
    />
  )
}
