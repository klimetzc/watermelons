import compose from 'compose-function';
import withRouter from './with-router';
import withAntdConfig from './with-antdConfig';
import withStore from './withStore';

const withProviders = compose(withStore, withRouter, withAntdConfig);

export default withProviders;
