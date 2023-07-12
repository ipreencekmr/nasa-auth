import { useDispatch } from 'react-redux';
import { ROOT_MODULE_NAME } from '../constants/module';

const SET_AUTH_INFO = `${ROOT_MODULE_NAME}/SET_AUTH_INFO`;

const setAuthInfo = (authorized, authToken) => ({
  type: SET_AUTH_INFO,
  payload: {
    authorized,
    authToken,
  },
});

export const useAuthDispatcher = () => {
  const dispatch = useDispatch();
  return (response) => {
    const action = setAuthInfo(true, response?.token);
    dispatch(action);
  };
};
