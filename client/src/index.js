import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
// import App from './App';

import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import Spinner from './components/Spinner/Spinner';

const App = React.lazy(() => import('./App'))
ReactDOM.render(
  // <React.StrictMode>
  <Suspense fallback={<Spinner />}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </Suspense>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();