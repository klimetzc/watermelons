/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import {
  HomeOutlined,
  InfoCircleOutlined,
  LikeOutlined,
} from '@ant-design/icons';
import {
  Breadcrumb,
  Col,
  message,
  Progress,
  Rate,
  Row,
  Skeleton,
  Statistic,
  Typography,
} from 'antd';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import BuyBucketButton from 'features/client/buy-bucket-btn/ui/BuyBucketButton';
import './ProductPage.scss';
import { dom, utils } from 'shared/lib';
import { categoriesEndpoints } from 'shared/api/categories.endpoints';
import { useTranslation } from 'react-i18next';
import ButtonMelon from 'shared/ui/ButtonMelon/ButtonMelon';
import moment from 'moment';
import { preordersEndpoints } from 'shared/api/preorders.enpoints';

const ProductPage: React.FC = () => {
  // TODO: Декомпозировать подписку в фичу
  const params = useParams();
  const [preorderParticipate] =
    preordersEndpoints.useParticipatePreorderMutation();

  dom.useTitle(`Товар № ${params.productId}`);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: category, isLoading: isCategoryLoading } =
    categoriesEndpoints.useCategoryQuery(params.categoryId!);
  const { data: productData, isLoading: isProductDataLoading } =
    categoriesEndpoints.useProductQuery({
      categoryId: params.categoryId!,
      productId: params.productId!,
    });
  const { t } = useTranslation();
  const [currentUsers, setCurrentUsers] = useState<number>(
    productData?.preorder?.preorderCurrentQuantity || 0
  );

  useEffect(() => {
    setIsLoading(isCategoryLoading && isProductDataLoading);
  }, [isCategoryLoading, isProductDataLoading]);

  const handlePreorderParticipate = async () => {
    try {
      await preorderParticipate(params.productId!).unwrap();
      message.success('Вы подписались на предзаказ');
      setCurrentUsers((state) => state + 1);
    } catch (err) {
      console.log(err);
      message.error('При оформлении предзаказа произошла ошибка');
    }
  };

  return (
    <div className="product-page">
      <div className="product-page__nav">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/categories">
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {' '}
            <Link to={`/categories/${params.categoryId}/products`}>
              {category?.title}
            </Link>{' '}
          </Breadcrumb.Item>
          <Breadcrumb.Item>{productData?.title || 'Товар'}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {productData?.preorder ? (
        <div className="product-page__collab-widget">
          <div className="product-page__collab-info">
            <InfoCircleOutlined style={{ fontSize: '28px' }} />
            <Typography.Paragraph className="product-page__collab-info-paragraph">
              Для {productData?.title || 'имя'} доступны совместные закупки!
              Можно предзаказать товар с хорошей скидкой и как только соберётся
              нужное кол-во покупателей - товар помчится к вам в руки!
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
                            currentUsers,
                            +productData!.preorder!.preorderExpectedQuantity
                          )
                        : 0
                    }
                  />
                </Col>
                <Col lg={16} md={8}>
                  <div className="product-page__collab-progress-info">
                    <div className="product-page__collab-body-counter">
                      {currentUsers} из{' '}
                      {productData?.preorder?.preorderExpectedQuantity}
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
                    value={moment(
                      productData?.preorder?.preorderEndsAt
                    ).format()}
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
          <div className="product-page__collab-actions">
            <ButtonMelon
              size="large"
              type="primary"
              onClick={handlePreorderParticipate}
            >
              Предзаказать
            </ButtonMelon>
            <p className="product-page__collab-price">
              {productData?.price || 0}{' '}
              {utils.getCurrencyString(`${productData?.currency}`) || '$'}
            </p>
          </div>
        </div>
      ) : null}

      <div className="product-page__product-card">
        {isLoading ? (
          <Skeleton.Image active />
        ) : (
          <div className="product-page__image-main" />
        )}

        <div className="product-page__product-card__info">
          <h2 className="product-page__product-title">
            {isLoading ? <Skeleton.Input active /> : productData?.title}
          </h2>
          <div className="product-page__product-features">
            <div className="product-page__rating">
              {isLoading ? (
                <Skeleton.Input active />
              ) : (
                <Rate allowHalf value={productData?.rating || 0.0} disabled />
              )}
              <span className="product-page__ratingQuantity">
                {isLoading ? (
                  <Skeleton.Input size="small" active />
                ) : (
                  productData?.quantityOfBuying
                )}
              </span>
            </div>
            <div className="product-page__feature-actions">
              <div className="product-page__feature product-page__feature-comparison" />
              <div className="product-page__feature product-page__feature-bookmark" />
              <div className="product-page__feature product-page__feature-share" />
            </div>
          </div>
          <div className="product-page__product-tech-description">
            <p className="product-page__product-tech-description-title">
              {t('Technical description')}
            </p>
            <p className="product-page__product-tech-description-paragraph">
              {isLoading ? <Skeleton active /> : productData?.techDescription}
            </p>
          </div>
          <div className="product-page__buisness-actions">
            <div className="product-page__price">
              {isLoading ? (
                <Skeleton.Input active />
              ) : (
                `${
                  productData?.preorder
                    ? productData?.preorder?.priceWithoutDiscount
                    : productData?.price
                } ${utils.getCurrencyString(`${productData?.currency}`) || '$'}`
              )}
            </div>
            <div className="product-page__buy-buttons">
              <BuyBucketButton
                cardId={`${params.productId}`}
                cardData={{
                  id: productData?.id || 1,
                  title: productData?.title || 'title',
                  description: productData?.description || 'desc',
                  price: productData?.price || 12,
                  currency: productData?.currency || 'USD',
                  checked: productData?.checked || true,
                  rating: productData?.rating || 4,
                  quantityOfBuying: productData?.quantityOfBuying || 19,
                  image: null,
                  idCategory: productData?.idCategory || +params.categoryId!,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="product-page__full-description">
        <h3 className="product-page__full-description-title">
          {t('Description')}
        </h3>
        <p className="product-page__full-description-paragraph">
          {isLoading ? <Skeleton active /> : productData?.description}
        </p>
      </div>
      <div className="product-page__full-tech-description">
        <h3 className="product-page__full-description-title">
          {t('Technical Characteristics')}
        </h3>
        <p className="product-page__full-description-paragraph">
          {isLoading ? <Skeleton active /> : productData?.techDescription}
        </p>
      </div>
      {/* <div className="product-page-reviews">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div> */}
    </div>
  );
};

export default ProductPage;
