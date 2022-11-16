import React from 'react';
import { Empty, Pagination, Typography } from 'antd';
import { useParams } from 'react-router';
import { preordersEndpoints } from 'shared/api/preorders.endpoints';
import UserListItem from './UserListItem';
import '../PreorderPage.scss';

const UserList = () => {
  const params = useParams();
  const { data: userData } = preordersEndpoints.usePreorderSubscribersQuery(
    params.preorderId!
  );
  console.log(userData);
  return (
    <div className="preorder-page__users">
      <Typography.Title level={3}>Users</Typography.Title>
      <Pagination showSizeChanger={false} />
      {userData?.participants?.length ? (
        userData?.participants.map((item) => (
          <UserListItem key={item.email} data={item} />
        ))
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
};

export default UserList;
