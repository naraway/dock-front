import { useContext } from 'react';
import { DockContext } from './DockProvider';

const useRoles = (drama?: string) => {
  const roles = useContext(DockContext)?.activeDramaRoles;
  const map = useContext(DockContext)?.activeDramaRoleMap;

  if (roles) {
    return drama ? map[drama] : roles;
  }

  return [];
};

export default useRoles;
