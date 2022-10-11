import React from 'react';
import { Input, InputProps } from 'antd';
import classNames from 'classnames';
import './SearchMelon.scss';

const { Search } = Input;

interface ISearchProps extends InputProps {
  hasShadow: boolean;
}

const SearchMelon: React.FC<ISearchProps> = ({ hasShadow, ...props }) => {
  const className = classNames(
    'search-melon',
    hasShadow ? 'search-melon_shadowed' : false
  );

  return <Search className={className} {...props} />;
};

export default SearchMelon;
