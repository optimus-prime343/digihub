import { TextInput } from '@mantine/core'
import { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { MdClear } from 'react-icons/md'

interface Props {
  onSearch: (value: string) => void
}

export const SearchContacts = ({ onSearch }: Props) => {
  const [query, setQuery] = useState('')

  useEffect(() => {
    onSearch(query)
  }, [query, onSearch])

  return (
    <TextInput
      icon={<BsSearch />}
      onChange={event => setQuery(event.target.value)}
      placeholder='Search contacts'
      rightSection={query ? <MdClear onClick={() => setQuery('')} /> : null}
      value={query}
    />
  )
}
