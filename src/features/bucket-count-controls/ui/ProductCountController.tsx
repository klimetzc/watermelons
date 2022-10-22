import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import Button from 'antd/es/button';
import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';
import './ProductCountController.scss';
import { IProductWithCount } from '../../../shared/api/types/interfaces';

interface IProps {
	cardData: IProductWithCount;
}

const ProductCountController: React.FC<IProps> = ({ cardData }) => {
	const onAdd = () => {
		//  апи запроса
	};

	return (
		<div className="product-count-controller">
			<div className="product-count-controller__input controller">
				<ButtonMelon sliced="right" className="controller__button">
					-
				</ButtonMelon>
				<Button type="text" shape="default" className="controller__count">
					{cardData.count}
				</Button>
				<ButtonMelon
					sliced="left"
					className="controller__button"
					onClick={onAdd}
				>
					+
				</ButtonMelon>
			</div>
			<ButtonMelon className="product-count-controller__delete-all">
				Удалить всё <DeleteOutlined />
			</ButtonMelon>
		</div>
	);
};

export default ProductCountController;
