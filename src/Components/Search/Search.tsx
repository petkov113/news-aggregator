import { FC } from 'react'
import './Search.scss'

export type PropsTypes = {
  handleSubmit: (keyword: string) => void
}

const Search: FC<PropsTypes> = ({ handleSubmit }) => {
  return (
    <input
      className="Search"
      name="search"
      type="text"
      placeholder="Search..."
      onChange={(e) => handleSubmit(e.target.value)}
    />
  )
}

export default Search
