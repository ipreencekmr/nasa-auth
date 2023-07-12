import { useSelector } from 'react-redux';

export const useFakeDomain = () => useSelector((state) => state.getIn(['config', 'fakeDomain']));
