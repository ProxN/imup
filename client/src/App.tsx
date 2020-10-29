import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact component={Home} />
        <Redirect to='/' />
      </Switch>
    </Layout>
  );
};

export default App;
