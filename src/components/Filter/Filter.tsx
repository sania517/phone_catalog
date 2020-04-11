import React, { FC } from 'react';
import './Filter.scss';
import { connect } from 'react-redux';
import { getQuery, setFilterQuery, setSort } from '../../store/store';

import search from '../../img/search.png';

interface Props {
  query: string;
  setQuery: (newQuery: string) => void;
  setSortOption: (option: sortOptions) => void;
}

const Filter: FC<Props> = ({ query, setQuery, setSortOption }) => {
  return (
    <div className="filter">
      <label className="filter__label">
        <p>Search</p>
        <img className="filter__search-img" src={search} />
        <input
          value={query}
          type="text"
          className="filter__input"
          placeholder="search"
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
      </label>
      <label className="filter__label">
        <p>Sort by</p>
        <select
          defaultValue="newest"
          className="filter__select filter__select-sort"
          onChange={(event => {
            setSortOption(event.target.value as sortOptions);
          })}
        >
          <option value="name">Name</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="cheaper">Cheaper first</option>
          <option value="expensive">Expensive</option>
          <option value="rating">Rating</option>
        </select>
      </label>
      <label className="filter__label">
        <p>Items on page</p>
        <select
          className="filter__select filter__select-pagination"
        >
          <option value="16">16</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </label>
    </div>
  );
};

const dispatchMapToProps = {
  setQuery: setFilterQuery,
  setSortOption: setSort,
};

const mapStateToProps = (state: PhoneCatalogStore) => ({
  query: getQuery(state),
});

export default connect(mapStateToProps, dispatchMapToProps)(Filter);
