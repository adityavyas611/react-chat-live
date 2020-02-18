import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Join from './components/Join/Join.component';
import Chat from './components/Chat/Chat.component';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Join}/>
          <Route path="/chat" component={Chat}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
