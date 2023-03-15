import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { store } from 'app/store';
import ScrollToTop from 'components/ScrollToTop';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import 'antd/dist/antd.css';
  import 'react-toastify/dist/ReactToastify.css';
  import 'react-loading-skeleton/dist/skeleton.css';
import './assets/scss/styles.scss';

ReactDOM.render(
 
    <Provider store={store} >
      <BrowserRouter>
        <ScrollToTop />
        <App />
        <ToastContainer
          position='top-right'
  
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);
