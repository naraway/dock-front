import { atom } from 'jotai';
import { DevDock, Dock } from '~/models';

const key = 'nara.dock';

const load = () => {
  const session = window ? window.sessionStorage.getItem(`${key}.session`) ?? '{}' : '{}';
  const context = window ? window.sessionStorage.getItem(`${key}.context`) ?? '{}' : '{}';

  return <Dock>{ session: JSON.parse(session), context: JSON.parse(context) };
};

const contextAtom = atom(load());
const developmentAtom = atom(false);
const authorizedAtom = atom((get) => !!get(contextAtom) && !!get(contextAtom).context?.actor);

export const dockAtom = atom(
  (get) => ({
    session: get(contextAtom).session,
    context: get(contextAtom).context,
    authorized: get(authorizedAtom),
    development: get(developmentAtom),
  }),
  (get, set, next: Dock | DevDock) => {
    const previous = get(contextAtom);

    if ('development' in next) {
      const dev = next as DevDock;
      if (JSON.stringify(previous) !== JSON.stringify(dev)) {
        set(contextAtom, <Dock>{ ...dev });
        save(<Dock>{ ...dev });
      }
      set(developmentAtom, true);
      return;
    }

    const dock = next as Dock;
    if (JSON.stringify(previous) !== JSON.stringify(dock)) {
      set(contextAtom, dock);

      if (dock.session?.pavilion) {
        save(dock);
      } else {
        clear();
      }
    }
  },
);

export const devDockAtom = atom<DevDock | null>(null);

//

const save = (dock: Dock) => {
  if (window) {
    window.sessionStorage.setItem(`${key}.session`, JSON.stringify(dock.session));
    window.sessionStorage.setItem(`${key}.context`, JSON.stringify(dock.context));
  }
};

const clear = () => {
  if (window) {
    window.sessionStorage.removeItem(`${key}.session`);
    window.sessionStorage.removeItem(`${key}.context`);
  }
};
