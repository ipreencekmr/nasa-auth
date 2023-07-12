import { useSelector } from 'react-redux';

export const useSignupUri = () => useSelector((state) => state.getIn(['config', 'signupUri']));
