import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FilterBar from '../../components/FilterBar';
import SortBar from '../../components/SortBar';
import { BugSortValues } from '../../redux/types';
import { sortBugsBy } from '../../redux/slices/bugsSlice';

import { Button } from '@material-ui/core';
import { useActionCardStyles } from '../../styles/muiStyles';
import AddIcon from '@material-ui/icons/Add';

const menuItems = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'a-z', label: 'Title (A - Z)' },
  { value: 'z-a', label: 'Title (Z - A)' },
  { value: 'closed', label: 'Recently Closed' },
  { value: 'reopened', label: 'Recently Re-opened' },
  { value: 'updated', label: 'Recently Updated' },
  { value: 'most-notes', label: 'Most Notes' },
  { value: 'least-notes', label: 'Least Notes' },
];

const BugsActionCard: React.FC<{
  filterValue: string;
  setFilterValue: (filterValue: string) => void;
}> = ({ filterValue, setFilterValue }) => {
  const classes = useActionCardStyles();
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState<BugSortValues>('newest');

  const handleSortChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = e.target.value as BugSortValues;
    setSortBy(selectedValue);
    dispatch(sortBugsBy(selectedValue));
  };

  return (
    <div>
      <div className={classes.inputs}>
        <div className={classes.searchBarWrapper}>
          <FilterBar
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            label="Bugs"
          />
        </div>
        <div className={classes.sortBarWrapper}>
          <SortBar
            sortBy={sortBy}
            handleSortChange={handleSortChange}
            menuItems={menuItems}
            label="Bugs"
          />
        </div>
      </div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        size="large"
      >
        Add Bug
      </Button>
    </div>
  );
};

export default BugsActionCard;