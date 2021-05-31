import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import store from './store';

//pages
import { HomePage, ListPage, BookPage } from './pages';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route path='/books'>
          <ListPage />
        </Route>
        <Route path='/book' render={(props) => <BookPage {...props}/>}>
        </Route>
      </Router>
    </Provider>
  );
  
}

export default App;
