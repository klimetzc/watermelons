import compose from 'compose-function';
import withRouter from './with-router';
import withAntdConfig from './with-antdConfig';

const withProviders = compose(withRouter, withAntdConfig);

export default withProviders;
