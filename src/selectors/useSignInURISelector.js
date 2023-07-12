import { useSelector } from 'react-redux';

export const useSigninUri = () => useSelector((state) => state.getIn(['config', 'signinUri']));
