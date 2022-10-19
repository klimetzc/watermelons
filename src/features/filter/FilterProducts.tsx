import React from 'react';
import ButtonMelon from '../../shared/ui/ButtonMelon/ButtonMelon';
import SearchMelon from '../../shared/ui/SearchMelon/SearchMelon';
import SwitchMelon from '../../shared/ui/SwitchMelon/SwitchMelon';

interface IFilter {
	search: string;
	filters: string[];
}
interface IProps {
	filter: IFilter;
	setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
}

const switchFilter = (add: boolean, target: string[], field: string) => {
	if (!add) return target.filter((item) => item !== field);
	target.push(field);

	return target;
};

const FilterProducts: React.FC<IProps> = ({ filter, setFilter }) => (
	<>
		<SearchMelon
			hasShadow={false}
			onChange={(e) => setFilter({ ...filter, search: e.target.value })}
		/>
		<div className="browse-products-page__settings-toggle">
			<SwitchMelon
				onChange={(e) =>
					setFilter({
						...filter,
						filters: switchFilter(e, filter.filters, 'checked'),
					})
				}
			/>{' '}
			Только проверенные
		</div>

		{/* <ButtonMelon type="primary">Применить настройки</ButtonMelon> */}
		<ButtonMelon>Сбросить настройки</ButtonMelon>
	</>
);

export default FilterProducts;
