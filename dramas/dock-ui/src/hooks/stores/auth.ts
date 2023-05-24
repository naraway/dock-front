import { CitizenUser } from '@nara-way/checkpoint-core';
import { atom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';
import { AuthUser, DevAuth, Token } from '~/models';
import { parseJwt } from '~/index';

const key = 'nara.token';

const load = () => {
  const access = window ? window.sessionStorage.getItem(`${key}.access`) ?? '' : '';
  const refresh = window ? window.localStorage.getItem(`${key}.refresh`) ?? '' : '';
  const remembered = window ? window.localStorage.getItem(`${key}.remembered`) ?? 'false' : 'false';

  return <Token>{ access, refresh, refreshed: true, remembered: remembered === 'true' };
};

const tokenAtom = atom(load());
const authenticatedAtom = atom((get) => !!get(tokenAtom)?.access && !!get(userAtom)?.user);
const developmentAtom = atom(false);
const userAtom = atomWithDefault((get) => getUser(get(tokenAtom)?.access ?? undefined));

export const heartbeatAtom = atom(0);

export const authAtom = atom(
  (get) => ({
    token: get(tokenAtom),
    authenticated: get(authenticatedAtom),
    user: get(userAtom).user as CitizenUser | undefined,
    workspaces: (get(userAtom)?.workspaces as string[]) ?? [],
    session: get(userAtom)?.session,
    development: get(developmentAtom),
  }),
  (get, set, next: Token | DevAuth) => {
    if ('development' in next) {
      // user for development
      const standin = next as DevAuth;
      const user = <CitizenUser>{
        ...standin.user,
      };

      const { workspaces, session, token } = standin;

      set(userAtom, <AuthUser>{
        user,
        workspaces,
        session,
      });
      set(developmentAtom, true);
      if (token) {
        set(tokenAtom, {
          access: token.access ?? '',
          refresh: token.refresh ?? '',
          refreshed: false,
          remembered: token.remembered,
        });
        save(token);
      }
      return;
    }

    const { access, refresh, refreshed, remembered } = next as Token;

    const token = <Token>{ access, refresh, refreshed, remembered };

    if (!access || !refresh) {
      set(tokenAtom, <Token>{ access: '', refresh: '', refreshed, remembered });
      save(token);
      clear();
      return;
    }

    set(tokenAtom, token);
    save(token);

    // refresh userAtom when ONLY login, NOT token refresh
    if (!refreshed) {
      set(userAtom, getUser(access));
    }
  },
);

export const devAuthAtom = atom<DevAuth | null>(null);

//

const save = (token: Token) => {
  window.sessionStorage.setItem(`${key}.access`, token.access);
  window.localStorage.setItem(`${key}.refresh`, token.refresh);
  window.localStorage.setItem(`${key}.remembered`, token.remembered ? 'true' : 'false');
};

const clear = () => {
  window.sessionStorage.removeItem(`${key}.access`);
  window.localStorage.removeItem(`${key}.refresh`);
};

const getUser = (token?: string) => {
  if (!token || token.split('.').length !== 3) {
    return <AuthUser>{
      user: <CitizenUser>{},
      workspaces: [],
    };
  }

  const claims = parseJwt(token);
  const attributes = claims['attributes'] || {};
  const citizenUser = <Partial<CitizenUser>>{
    username: claims['username'],
    email: claims['email'],
    displayName: claims['display_name'],
    pavilionId: attributes['pavilion_id'],
    active: true,
    additionalInformation: { ...attributes },
  };

  return <AuthUser>{
    user: citizenUser,
    workspaces: attributes?.cineroom_ids ?? [],
    session: attributes?.citizen_session_id,
  };
};
