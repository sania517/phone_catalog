import React, { FC } from 'react';
import { connect } from 'react-redux';
import './Filter.scss';
import {
  setFilterQuery,
  setSort,
  setPaginationParam,
} from '../../store/actionCreators';
import { getPaginationParam } from '../../store/selectors';
import { sortOptions, paginationOptions } from '../../util/enums';

interface Props {
  setQuery: (newQuery: string) => void;
  setSortOption: (option: sortOptions) => void;
  setPagination: (payload: paginationOptions) => void;
  pagination: paginationOptions;
}

const Filter: FC<Props> = (props) => {
  const { setSortOption, pagination, setPagination } = props;

  const onPagination = (event: React.FormEvent<HTMLSelectElement>) => {
    const val = event.currentTarget.value as paginationOptions;

    setPagination(val);
  };

  return (
    <div className="filter">
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
  pagination: getPaginationParam(state),
});

export default connect(mapStateToProps, dispatchMapToProps)(Filter);
