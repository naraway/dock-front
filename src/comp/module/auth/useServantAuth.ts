import { useContext } from 'react';
import { ServantAuthContext } from './ServantAuthProvider';

const useAuth = () => {
  return useContext(ServantAuthContext);
};

export default useAuth;
