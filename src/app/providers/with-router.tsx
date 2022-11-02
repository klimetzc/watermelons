import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import SpinFullPage from '../../shared/ui/SpinFullPage/SpinFullPage';

const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<SpinFullPage />}>{component()}</Suspense>
    </BrowserRouter>
  );

export default withRouter;
