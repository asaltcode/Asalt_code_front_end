import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Flip, ToastContainer, Zoom} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import store from './Redux/store.jsx';
  import { Provider } from 'react-redux';
// import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Flip}
/>
  </React.StrictMode>,
)
