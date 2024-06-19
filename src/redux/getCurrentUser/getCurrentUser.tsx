import { useSelector } from 'react-redux';
import { selectAuth } from '../auth/auth.selector';

const useCurrentUser = () => {
  return useSelector(selectAuth);
};

export default useCurrentUser;