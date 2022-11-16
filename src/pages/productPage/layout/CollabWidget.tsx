import { InfoCircleOutlined, LikeOutlined } from '@ant-design/icons';
import {
  Col,
  message,
  Progress,
  Row,
  Statistic,
  Tooltip,
  Typography,
} from 'antd';
import { RootState } from 'app/store';
import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { preordersEndpoints } from 'shared/api/preorders.endpoints';
import { IProductFull } from 'shared/api/types/interfaces';
import { utils } from 'shared/lib';
import ButtonMelon from 'shared/ui/ButtonMelon/ButtonMelon';
import '../ProductPage.scss';

interface ICollabWidget {
  productData: IProductFull | undefined;
}

export const CollabWidget: React.FC<ICollabWidget> = ({ productData }) => {
  const params = useParams();
  const [isUserSubscribed, setIsUserSubscribed] = useState<boolean>(false);
  const isSellerLogged = useSelector(
    (state: RootState) => state.sellerAuthReducer.isLoggedIn
  );

  const isClientLogged = useSelector(
    (state: RootState) => state.userAuthReducer.isLoggedIn
  );

  const [preorderParticipate] =
    preordersEndpoints.useParticipatePreorderMutation();

  const handlePreorderParticipate = async () => {
    try {
      await preorderParticipate(params.productId!).unwrap();
      message.success('Вы подписались на предзаказ');
      setIsUserSubscribed(true);
    } catch (err) {
      console.log(err);
      message.error('При оформлении предзаказа произошла ошибка');
    }
  };

  return (
    <div className="product-page__collab-widget">
      <div className="product-page__collab-info">
        <InfoCircleOutlined style={{ fontSize: '28px' }} />
        <Typography.Paragraph className="product-page__collab-info-paragraph">
          Для {productData?.title || 'имя'} доступны совместные закупки! Можно
          предзаказать товар с хорошей скидкой и как только соберётся нужное
          кол-во покупателей - товар помчится к вам в руки!
        </Typography.Paragraph>
      </div>
      <Row gutter={8} className="product-page__collab-progress">
        <Col lg={12} md={24} className="product-page__collab-progress-bars">
          <Row justify="space-between" gutter={8}>
            <Col lg={8} md={16}>
              <Progress
                type="circle"
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                percent={
                  productData
                    ? utils.getPercentFromValue(
                        isUserSubscribed
                          ? +productData!.preorder!.preorderCurrentQuantity + 1
                          : +productData!.preorder!.preorderCurrentQuantity,
                        +productData!.preorder!.preorderExpectedQuantity
                      )
                    : 0
                }
              />
            </Col>
            <Col lg={16} md={8}>
              <div className="product-page__collab-progress-info">
                <div className="product-page__collab-body-counter">
                  {isUserSubscribed
                    ? +productData!.preorder!.preorderCurrentQuantity + 1
                    : productData?.preorder?.preorderCurrentQuantity}{' '}
                  из {productData?.preorder?.preorderExpectedQuantity}
                </div>
                <div className="product-page__collab-date-counter">
                  до{' '}
                  {moment(productData?.preorder?.preorderEndsAt).format(
                    'DD.MM.YYYY'
                  )}
                </div>
                <div className="product-page__collab-days-counter">
                  осталось{' '}
                  {moment(productData?.preorder?.preorderEndsAt).diff(
                    moment(new Date()),
                    'days'
                  )}{' '}
                  дней
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={12} md={24}>
          <div className="product-page__statistics">
            <div>
              <Statistic.Countdown
                value={moment(productData?.preorder?.preorderEndsAt).format()}
                format="D дней HH часов mm минут"
              />
            </div>
            <div className="product-page__collab-feedback">
              <Statistic
                title="Оценок"
                value={1128}
                prefix={<LikeOutlined />}
              />
            </div>
          </div>
        </Col>
      </Row>
      {!isSellerLogged && (
        <div className="product-page__collab-actions">
          {isClientLogged ? (
            <ButtonMelon
              size="large"
              type="primary"
              onClick={handlePreorderParticipate}
            >
              Предзаказать
            </ButtonMelon>
          ) : (
            <Tooltip title="Нужно сначала авторизоваться">
              <Typography.Paragraph disabled>
                Предзаказ доступен только после регистрации
              </Typography.Paragraph>
            </Tooltip>
          )}

          <p className="product-page__collab-price">
            {productData?.price || 0}{' '}
            {utils.getCurrencyString(`${productData?.currency}`) || '$'}
          </p>
        </div>
      )}
    </div>
  );
};
