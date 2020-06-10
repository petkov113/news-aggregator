import React, { FC } from "react";
import { PropsTypes } from "./SearchTypes";
import "./Search.scss";

const Search: FC<PropsTypes> = ({ onChange, onSubmit, value }) => {
  return (
    <form className="Search" name="search" onSubmit={onSubmit}>
      <input type="text" placeholder="Search" onChange={onChange} value={value}/>
      <button type="submit">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
};

export default Search;
