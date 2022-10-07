import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Spin } from 'antd';

const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense
        fallback={<Spin delay={300} className="overlay" size="large" />}
      >
        {component()}
      </Suspense>
    </BrowserRouter>
  );

export default withRouter;
