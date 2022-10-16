import React, { useEffect, useState } from 'react';
import clientApi from '../../shared/api/client';
import Header from '../../widgets/Header/Header';

const ClientProfiles = () => {
  const [userData, setUserData] = useState('default data');

  useEffect(() => {
    clientApi
      .getProfile()
      .then((profileJson) => {
        setUserData(JSON.stringify(profileJson));
      })
      .catch(() => {
        setUserData('data fetching failed');
      });
    document.title = 'Профиль пользователя';
  }, []);

  return (
    <>
      <Header />
      <div>
        Эту страницу видят только зарегистрированные пользователи (клиенты)
        <p>user data: {userData}</p>
      </div>
    </>
  );
};

export default ClientProfiles;
