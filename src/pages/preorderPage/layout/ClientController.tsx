import { Typography } from 'antd';
import { Payment } from 'features/client/payment';
import React from 'react';

interface IClientController {
  status: string | undefined;
  sum: number;
}

const ClientController: React.FC<IClientController> = ({ status, sum }) => (
  <div>
    {status === 'CLIENT_AWAITING_PAYMENT' ? (
      <Payment.Form sum={sum} />
    ) : (
      <Typography.Paragraph>
        Статус не определён, ожидайте...
      </Typography.Paragraph>
    )}
  </div>
);

export default ClientController;
