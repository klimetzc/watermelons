import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Spin } from 'antd';

interface IWithRouterProps {
  component: React.ReactNode;
}

function WithRouter({ component }: IWithRouterProps) {
  return (
    <BrowserRouter>
      <Suspense
        fallback={<Spin delay={300} className="spin_overlay" size="large" />}
      >
        {component}
      </Suspense>
    </BrowserRouter>
  );
}

export default WithRouter;
