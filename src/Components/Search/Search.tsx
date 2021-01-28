import { FC, useState } from "react";
import { ChangeEvent, FormEvent } from 'react';
import "./Search.scss";

export type PropsTypes = {
  handleSubmit: (keyword: string) => void;
};

const Search: FC<PropsTypes> = ({ handleSubmit }) => {
  const [keyword, setKeyord] = useState<string>('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyord(event.target.value);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    keyword.trim() && handleSubmit(keyword);
  };

  return (
    <form className='Search' name='search' onSubmit={onSubmit}>
      <input type='text' placeholder='Search...' onChange={onChange} value={keyword} />
      <button type='submit'>
        <i className='fas fa-search'></i>
      </button>
    </form>
  );
};

export default Search;
