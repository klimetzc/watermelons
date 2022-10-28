import { IFilters } from '../ui/FilterProducts';

export interface ISortState {
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}
export interface IFilter {
  search: string;
  filters: IFilters;
  range: number[];
}
export interface IFilterState {
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
}
export interface IisResetState {
  isReset: boolean;
  setIsReset: React.Dispatch<React.SetStateAction<boolean>>;
}
