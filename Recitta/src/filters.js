const filters = {
   searchText: '',
   sortBy: 'byEdited',

};

const getFilters = () => filters;

const setFilters = ({ searchText, sortBy}) => {
   if (typeof searchText === 'string') {
      filters.searchText = searchText
   };

   if (typeof sortBy === 'string') {
      filters.sortBy = sortBy
   };

};

export  { getFilters, setFilters}