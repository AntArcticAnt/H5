import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router'
import IndexPage from './routes/IndexPage';
import HomePage from './routes/HomePage';
import ThemePage from './routes/ThemePage';
import DiscoverPage from './routes/DiscoverPage';
import MinePage from './routes/MinePage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage}>
        {/*<IndexRoute component={HomePage} />*/}
        <Route path="/home" component={HomePage} />
        <Route path="/theme" component={ThemePage} />
        <Route path="/discover" component={DiscoverPage} />
        <Route path="/mine" component={MinePage} />
      </Route>
    </Router>
  );
  //<Route path="/*" component={error} />
}

export default RouterConfig;
