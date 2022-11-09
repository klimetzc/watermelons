import React from 'react';
import { Avatar, Form, message, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { clientProfileActions } from '../../../entities/user/model/clientProfile';
import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';
import InputMelon from '../../../shared/ui/InputMelon/InputMelon';
import type { RootState } from '../../../app/store';
import './EditProfile.scss';
import IUserData from './lib/interfaces';
import { clientEndpoints } from '../../../shared/api/client.endpoints';

interface IEditProfile {
  isModalOpen: boolean;
  setIsModalOpen: (arg0: boolean) => void;
}

const EditProfile: React.FC<IEditProfile> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const dispatch = useDispatch();
  const currentUserData = useSelector(
    (state: RootState) => state.clientProfileReducer.userdata
  );
  const [updateProfile, { isLoading: isUpdateProfileLoading }] =
    clientEndpoints.useClientUpdateProfileMutation();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: IUserData) => {
    try {
      await updateProfile(values).unwrap();
      dispatch(clientProfileActions.updateProfile(values));
      dispatch(clientProfileActions.setIsFilled(true));
      setIsModalOpen(false);
    } catch (error) {
      message.error('При обновлении профиля произошла ошибка...');
    }
  };

  return (
    <Modal
      title="Редактирование профиля"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[<span key="Watermelons">Арбузики</span>]}
      className={classNames(
        'edit-profile',
        localStorage.getItem('darkThemeEnabled') ? 'app-theme_dark' : false
      )}
    >
      <Avatar
        className="edit-profile__avatar"
        size={150}
        src="https://img.freepik.com/free-photo/attractive-curly-woman-purple-cashmere-sweater-fuchsia-sunglasses-poses-isolated-wall_197531-24158.jpg?w=1380&t=st=1666607179~exp=1666607779~hmac=3bce6fca4329adcd9fc0c6a00b316fbab2e15a7127560790b779450369b16eb8"
      />
      <Form
        className="edit-profile__form"
        onFinish={onFinish}
        initialValues={{
          name: currentUserData.name || '',
          surname: currentUserData?.surname || '',
          family: currentUserData?.family || '',
          phone: currentUserData?.phone ? +currentUserData.phone : '',
          address: currentUserData?.address || '',
        }}
      >
        <Form.Item label="Имя" name="name" rules={[{ required: true }]}>
          <InputMelon />
        </Form.Item>
        <Form.Item label="Фамилия" name="family" rules={[{ required: true }]}>
          <InputMelon />
        </Form.Item>
        <Form.Item label="Отчество" name="surname" rules={[{ required: true }]}>
          <InputMelon />
        </Form.Item>
        <Form.Item label="Адрес" name="address" rules={[{ required: true }]}>
          <InputMelon />
        </Form.Item>
        <Form.Item label="Номер" name="phone" rules={[{ required: true }]}>
          <InputMelon type="number" />
        </Form.Item>

        <Form.Item>
          <ButtonMelon
            htmlType="submit"
            type="primary"
            loading={isUpdateProfileLoading}
          >
            Отправить
          </ButtonMelon>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProfile;
