import { useDock } from './useDock';

export const useRole = (drama?: string) => {
  const { authorized, context } = useDock();
  const { dramaRoles, dramaRoleMap } = context;

  if (authorized) {
    return drama ? (dramaRoleMap ?? {})[drama] : dramaRoles ?? [];
  }

  return [];
};
