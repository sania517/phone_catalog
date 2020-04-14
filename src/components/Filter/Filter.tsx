import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import './Filter.scss';
import search from '../../img/search.png';
import {
  setFilterQuery,
  setSort,
  setPaginationParam,
} from '../../store/actionCreators';
import { getQuery, getPaginationParam } from '../../store/selectors';
import { sortOptions, paginationOptions } from '../../util/enums';

interface Props {
  query: string;
  setQuery: (newQuery: string) => void;
  setSortOption: (option: sortOptions) => void;
  setPagination: (payload: paginationOptions) => void;
  pagination: paginationOptions;
}

const Filter: FC<Props> = (props) => {
  const { query, setQuery, setSortOption, pagination, setPagination } = props;
  const match = useRouteMatch();

  useEffect(() => {
    setQuery('');
    setSortOption(sortOptions.newest);
  }, [match.path]);

  const onPagination = (event: React.FormEvent<HTMLSelectElement>) => {
    const val = event.currentTarget.value as paginationOptions;

    setPagination(val);
  };

  return (
    <div className="filter">
      <label className="filter__label">
        <p>Search</p>
        <img className="filter__search-img" src={search} alt="" />
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
          value={pagination}
          onChange={onPagination}
          className="filter__select filter__select-pagination"
        >
          <option value={paginationOptions.l16}>16</option>
          <option value={paginationOptions.l25}>25</option>
          <option value={paginationOptions.l50}>50</option>
          <option value={paginationOptions.l100}>100</option>
        </select>
      </label>
    </div>
  );
};

const dispatchMapToProps = {
  setQuery: setFilterQuery,
  setSortOption: setSort,
  setPagination: setPaginationParam,
};

const mapStateToProps = (state: PhoneCatalogStore) => ({
  query: getQuery(state),
  pagination: getPaginationParam(state),
});

export default connect(mapStateToProps, dispatchMapToProps)(Filter);
