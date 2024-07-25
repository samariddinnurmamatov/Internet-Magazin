import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Toast.css';

const notifySuccess = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    className: 'toast-success',
    autoClose: 3000,
  });
};

const notifyError = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    className: 'toast-error',
    autoClose: 3000,
  });
};

const notifyDelete = (message) => {
  toast.warn(message, {
    position: toast.POSITION.TOP_RIGHT,
    className: 'toast-delete',
    autoClose: 3000,
  });
};

const Toast = () => {
  return <ToastContainer />;
};

export { Toast, notifySuccess, notifyError, notifyDelete };
