import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Descriptions } from 'antd';
import { EditProfile } from 'features/client/edit-profile';
import UserData from 'shared/constants/types';
import ButtonMelon from 'shared/ui/ButtonMelon/ButtonMelon';
import '../ClientProfile.scss';

interface IUserProfile {
  userData: UserData | undefined;
}

export const UserProfile: React.FC<IUserProfile> = ({ userData }) => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  return (
    <Descriptions
      className="client-profile__description"
      title="Профиль пользователя"
      bordered
      column={1}
      extra={
        <>
          <ButtonMelon
            onClick={() => {
              setIsEditOpen(true);
            }}
          >
            Edit
          </ButtonMelon>
          <EditProfile.Form
            isModalOpen={isEditOpen}
            setIsModalOpen={setIsEditOpen}
          />{' '}
          <Avatar
            size="large"
            icon={<UserOutlined />}
            src="https://img.freepik.com/free-photo/attractive-curly-woman-purple-cashmere-sweater-fuchsia-sunglasses-poses-isolated-wall_197531-24158.jpg?w=1380&t=st=1666612660~exp=1666613260~hmac=695d0bade27feba8b87a07f89fd4af7904314f8159d8e3bd98d3821bf7f77c51"
          />
        </>
      }
    >
      <Descriptions.Item label="Имя">
        {userData?.name || 'Информация отсутствует'}
      </Descriptions.Item>
      <Descriptions.Item label="Фамилия">
        {userData?.family || 'Информация отсутствует'}
      </Descriptions.Item>
      <Descriptions.Item label="Отчество">
        {userData?.surname || 'Информация отсутствует'}
      </Descriptions.Item>
      <Descriptions.Item label="Адрес">
        {userData?.address || 'Информация отсутствует'}
      </Descriptions.Item>
      <Descriptions.Item label="Телефон">
        {userData?.phone || 'Информация отсутствует'}
      </Descriptions.Item>
    </Descriptions>
  );
};
