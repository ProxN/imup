import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact component={() => <h1>Hello World</h1>} />
        <Redirect to='/' />
      </Switch>
    </Layout>
  );
};

export default App;
