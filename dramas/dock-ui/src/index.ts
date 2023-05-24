export * from './components';
export * from './hooks';
export * from './models';

export const ns = '@nara-way/dock-ui';

export const parseJwt = (token: string) => {
  if (!token || !window) {
    return {};
  }

  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  const payload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  );

  return JSON.parse(payload) as { [p: string]: any };
};
