import { useContext } from 'react';
import { DockContext } from './DockProvider';

const useRoles = (drama?: string) => {
  const roles = useContext(DockContext)?.currentDramaRoles;
  const map = useContext(DockContext)?.currentDramaRoleMap;

  if (roles) {
    return drama ? map[drama] : roles;
  }

  return [];
};

export default useRoles;
