import { TextInput } from '@mantine/core'
import { BsSearch } from 'react-icons/bs'

interface Props {
  onSearch: (value: string) => void
}

export const SearchContacts = ({ onSearch }: Props) => {
  return (
    <TextInput
      icon={<BsSearch />}
      onChange={event => onSearch(event.currentTarget.value)}
      placeholder='Search contacts'
    />
  )
}
