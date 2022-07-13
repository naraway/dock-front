import React, { useEffect, useRef, useState } from 'react';
import { AvailableDockRdo } from '../../api';
import { useAuth } from '../auth';
import { Current, CurrentKollection, CurrentStage } from './model';
import { DockStorage } from './storage';
import { ActorKey } from "@nara-way/accent";

export interface Dock {
  availableDock: AvailableDockRdo | null;
  defaultStage: Current | null,
  defaultFirst: boolean,
  currentCitizen: Current | null,
  currentPavilion: Current | null,
  currentAudience: Current | null,
  currentCineroom: Current | null,
  currentActor: Current | null,
  currentStage: CurrentStage | null,
  currentKollection: CurrentKollection | null,
  currentStageRoles: string[];
  currentDramaRoles: string[];
  currentDramaRoleMap: {
    [key: string]: string[],
  },
  loaded: boolean,
  updateDefaultStage: (stageId: string) => void;
  toggleDefaultFirst: (defaultFirst: boolean) => void;
  switchStage: (stageId: string) => void;
  switchContext: (url: string, name?: string) => void;
  reload: () => void;
}

export const DockContext = React.createContext<Dock>({
  availableDock: null,
  defaultStage: null,
  defaultFirst: false,
  currentCitizen: null,
  currentPavilion: null,
  currentAudience: null,
  currentCineroom: null,
  currentActor: null,
  currentStage: null,
  currentKollection: null,
  currentStageRoles: [],
  currentDramaRoles: [],
  currentDramaRoleMap: {},
  loaded: false,
  updateDefaultStage: (stageId: string) => {},
  toggleDefaultFirst: (defaultFirst: boolean) => {},
  switchStage: (stageId: string) => {},
  switchContext: (url: string, name?: string) => {},
  reload: () => {},
});

const DockProvider = (props: {
  children: React.ReactNode,
  development: boolean,
  devdock?: Dock | undefined,
}) => {
  const auth = useAuth();
  const ref = useRef<DockStorage | null>(null);
  const { development = false, devdock, children } = props;

  const [ dock, setDock ] = useState<Dock>({
    availableDock: null,
    defaultStage: null,
    defaultFirst: false,
    currentCitizen: null,
    currentPavilion: null,
    currentAudience: null,
    currentCineroom: null,
    currentActor: null,
    currentStage: null,
    currentKollection: null,
    currentStageRoles: [],
    currentDramaRoles: [],
    currentDramaRoleMap: {},
    loaded: false,
    updateDefaultStage: (stageId: string) => {
      if (ref.current && ref.current.updateDefaultStage) {
        ref.current.updateDefaultStage(stageId);
      }
    },
    toggleDefaultFirst: (defaultFirst: boolean) => {
      if (ref.current && ref.current.toggleDefaultFirst) {
        ref.current.toggleDefaultFirst(defaultFirst);
      }
    },
    switchStage: async (stageId: string) => {
      if (ref.current && ref.current.switchStage) {
        ref.current.switchStage(stageId);
      }
    },
    switchContext: async (url: string, name?: string) => {
      if (ref.current && ref.current.switchContext) {
        ref.current.switchContext(url, name);
      }
    },
    reload: async () => {
      if (ref.current) {
        const {
          availableDock,
          defaultStage,
          defaultFirst,
          currentPavilion,
          currentCitizen,
          currentCineroom,
          currentAudience,
          currentStage,
          currentActor,
          currentKollection,
          currentStageRoles,
          currentDramaRoles,
          loaded,
        } = ref.current;

        const currentDramaRoleMap: {[key: string]: string[]} = {};
        currentDramaRoles.forEach(currentDramaRole => {
          const [key, value] = currentDramaRole.split(':');
          if (currentDramaRoleMap[key]) {
            currentDramaRoleMap[key].push(value);
          } else {
            currentDramaRoleMap[key] = [value];
          }
        });

        setDock({
          ...dock,
          availableDock,
          defaultStage,
          defaultFirst,
          currentPavilion,
          currentCitizen,
          currentCineroom,
          currentAudience,
          currentStage,
          currentActor,
          currentKollection,
          currentStageRoles,
          currentDramaRoles,
          currentDramaRoleMap,
          loaded,
        });
      }
    }
  });

  const update = () => {
    //
    if (!development && auth.loggedIn && auth.citizen && !ref.current?.loaded) {
      const dockStorage = ref.current;
      const email = auth.citizen?.email;
      const cineroomId = auth.cineroomIds ? auth.cineroomIds[0][0] : '1:1:1';
      if (email && cineroomId) {
        dockStorage?.findAvailableDockWithEmailAndPavilionId(
          email,
          cineroomId.substring(0, cineroomId.lastIndexOf(':')),
        ).then(() => setDock({...dock}));
      }
    }
  };

  useEffect(() => {
    //
    if (!ref.current) {
      ref.current = DockStorage.instance;
      setDock({...dock});
    }

    // init dock
    if (!development && !ref.current?.loaded) {
      update();
    }

    // dev only
    if (development && devdock) {
      if (!dock || !dock.currentActor) {
        const {
          currentDramaRoles,
        } = devdock;

        const currentDramaRoleMap: {[key: string]: string[]} = {};
        currentDramaRoles.forEach(currentDramaRole => {
          const [key, value] = currentDramaRole.split(':');
          if (currentDramaRoleMap[key]) {
            if (!currentDramaRoleMap[key].includes(value)) {
              currentDramaRoleMap[key].push(value);
            }
          } else {
            currentDramaRoleMap[key] = [value];
          }
        });

        setDock({
          ...dock,
          ...devdock,
          currentDramaRoleMap,
          loaded: true,
        });

        if (!ref.current?.loaded) {
          const dockStorage = ref.current;
          dockStorage?.setDock(
            devdock.availableDock || new AvailableDockRdo(null, null, null, false, []),
            devdock.defaultStage || Current.new(),
            devdock.defaultFirst || false,
            devdock.currentCitizen || Current.new(),
            devdock.currentPavilion || Current.new(),
            devdock.currentAudience || Current.new(),
            devdock.currentCineroom || Current.new(),
            devdock.currentActor || Current.new(),
            devdock.currentStage || CurrentStage.new(),
            devdock.currentKollection || CurrentKollection.new(),
            devdock.currentStageRoles || [],
            devdock.currentDramaRoles || [],
            development,
          );
        }
      }
    }
  }, [ dock, auth ]);

  if (!development && ref.current && dock.loaded !== ref.current?.loaded) {
    const {
      availableDock,
      defaultStage,
      defaultFirst,
      currentPavilion,
      currentCitizen,
      currentCineroom,
      currentAudience,
      currentStage,
      currentActor,
      currentKollection,
      currentStageRoles,
      currentDramaRoles,
      loaded,
    } = ref.current;

    const currentDramaRoleMap: {[key: string]: string[]} = {};
    currentDramaRoles.forEach(currentDramaRole => {
      const [key, value] = currentDramaRole.split(':');
      if (currentDramaRoleMap[key]) {
        if (!currentDramaRoleMap[key].includes(value)) {
          currentDramaRoleMap[key].push(value);
        }
      } else {
        currentDramaRoleMap[key] = [value];
      }
    });

    setDock({
      ...dock,
      availableDock,
      defaultStage,
      defaultFirst,
      currentPavilion,
      currentCitizen,
      currentCineroom,
      currentAudience,
      currentStage,
      currentActor,
      currentKollection,
      currentStageRoles,
      currentDramaRoles,
      currentDramaRoleMap,
      loaded,
    });
  }

  if (!development && ref.current && dock.loaded && !auth.loggedIn) {
    ref.current?.clear();
  }

  return (
    <DockContext.Provider value={dock}>
      {children}
    </DockContext.Provider>
  );
};

export default DockProvider;
