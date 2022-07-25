import React, { useEffect, useRef, useState } from 'react';
import { ActiveDockRdo } from '../../api';
import { useAuth } from '../auth';
import { ActiveInfo, ActiveKollection, ActiveStage } from './model';
import { DockStorage } from './storage';

export interface Dock {
  activeDock: ActiveDockRdo | null;
  defaultStage: ActiveInfo | null,
  defaultFirst: boolean,
  // for legacy start
  currentCitizen: ActiveInfo | null,
  currentPavilion: ActiveInfo | null,
  currentAudience: ActiveInfo | null,
  currentCineroom: ActiveInfo | null,
  currentActor: ActiveInfo | null,
  currentStage: ActiveStage | null,
  currentKollection: ActiveKollection | null,
  currentStageRoles: string[];
  currentKollectionRoles: string[];
  currentDramaRoles: string[];
  currentDramaRoleMap: {
    [key: string]: string[],
  },
  // for legacy end
  activeCitizen: ActiveInfo | null,
  activePavilion: ActiveInfo | null,
  activeAudience: ActiveInfo | null,
  activeCineroom: ActiveInfo | null,
  activeActor: ActiveInfo | null,
  activeStage: ActiveStage | null,
  activeKollection: ActiveKollection | null,
  activeKollectionRoles: string[];
  activeDramaRoles: string[];
  activeDramaRoleMap: {
    [key: string]: string[],
  },
  baseActor: ActiveInfo | null,
  baseStage: ActiveStage | null,
  baseKollection: ActiveKollection | null,
  baseKollectionRoles: string[];
  baseDramaRoles: string[];
  baseDramaRoleMap: {
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
  activeDock: null,
  defaultStage: null,
  defaultFirst: false,
  // for legacy start
  currentCitizen: null,
  currentPavilion: null,
  currentAudience: null,
  currentCineroom: null,
  currentActor: null,
  currentStage: null,
  currentKollection: null,
  currentStageRoles: [],
  currentKollectionRoles: [],
  currentDramaRoles: [],
  currentDramaRoleMap: {},
  // for legacy end
  activeCitizen: null,
  activePavilion: null,
  activeAudience: null,
  activeCineroom: null,
  activeActor: null,
  activeStage: null,
  activeKollection: null,
  activeKollectionRoles: [],
  activeDramaRoles: [],
  activeDramaRoleMap: {},
  baseActor: null,
  baseStage: null,
  baseKollection: null,
  baseKollectionRoles: [],
  baseDramaRoles: [],
  baseDramaRoleMap: {},
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
    activeDock: null,
    defaultStage: null,
    defaultFirst: false,
    // for legacy start
    currentCitizen: null,
    currentPavilion: null,
    currentAudience: null,
    currentCineroom: null,
    currentActor: null,
    currentStage: null,
    currentKollection: null,
    currentStageRoles: [],
    currentKollectionRoles: [],
    currentDramaRoles: [],
    currentDramaRoleMap: {},
    // for legacy end
    activeCitizen: null,
    activePavilion: null,
    activeAudience: null,
    activeCineroom: null,
    activeActor: null,
    activeStage: null,
    activeKollection: null,
    activeKollectionRoles: [],
    activeDramaRoles: [],
    activeDramaRoleMap: {},
    baseActor: null,
    baseStage: null,
    baseKollection: null,
    baseKollectionRoles: [],
    baseDramaRoles: [],
    baseDramaRoleMap: {},
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
          activeDock,
          defaultStage,
          defaultFirst,
          activePavilion,
          activeCitizen,
          activeCineroom,
          activeAudience,
          activeActor,
          activeStage,
          activeKollection,
          activeKollectionRoles,
          activeDramaRoles,
          baseActor,
          baseStage,
          baseKollection,
          baseKollectionRoles,
          baseDramaRoles,
          loaded,
        } = ref.current;

        const activeDramaRoleMap: {[key: string]: string[]} = {};
        activeDramaRoles.forEach(activeDramaRole => {
          const [key, value] = activeDramaRole.split(':');
          if (activeDramaRoleMap[key]) {
            activeDramaRoleMap[key].push(value);
          } else {
            activeDramaRoleMap[key] = [value];
          }
        });

        const baseDramaRoleMap: {[key: string]: string[]} = {};
        baseDramaRoles.forEach(baseDramaRole => {
          const [key, value] = baseDramaRole.split(':');
          if (baseDramaRoleMap[key]) {
            baseDramaRoleMap[key].push(value);
          } else {
            baseDramaRoleMap[key] = [value];
          }
        });

        setDock({
          ...dock,
          activeDock,
          defaultStage,
          defaultFirst,
          // for legacy start
          currentPavilion: activePavilion,
          currentCitizen: activeCitizen,
          currentCineroom: activeCineroom,
          currentAudience: activeAudience,
          currentActor: activeActor,
          currentStage: activeStage,
          currentKollection: activeKollection,
          currentStageRoles: activeKollectionRoles,
          currentKollectionRoles: activeKollectionRoles,
          currentDramaRoles: activeDramaRoles,
          currentDramaRoleMap: activeDramaRoleMap,
          // for legacy end
          activePavilion,
          activeCitizen,
          activeCineroom,
          activeAudience,
          activeActor,
          activeStage,
          activeKollection,
          activeKollectionRoles,
          activeDramaRoles,
          activeDramaRoleMap,
          baseActor,
          baseStage,
          baseKollection,
          baseKollectionRoles,
          baseDramaRoles,
          baseDramaRoleMap,
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
      if (!dock || !dock.activeActor) {
        const { activeDramaRoles = [], baseDramaRoles = [] } = devdock;

        const activeDramaRoleMap: {[key: string]: string[]} = {};
        activeDramaRoles.forEach(activeDramaRole => {
          const [key, value] = activeDramaRole.split(':');
          if (activeDramaRoleMap[key]) {
            if (!activeDramaRoleMap[key].includes(value)) {
              activeDramaRoleMap[key].push(value);
            }
          } else {
            activeDramaRoleMap[key] = [value];
          }
        });

        const baseDramaRoleMap: {[key: string]: string[]} = {};
        baseDramaRoles.forEach(baseDramaRole => {
          const [key, value] = baseDramaRole.split(':');
          if (baseDramaRoleMap[key]) {
            if (!baseDramaRoleMap[key].includes(value)) {
              baseDramaRoleMap[key].push(value);
            }
          } else {
            baseDramaRoleMap[key] = [value];
          }
        });

        setDock({
          ...dock,
          ...devdock,
          activeDramaRoleMap,
          baseDramaRoleMap,
          loaded: true,
        });

        if (!ref.current?.loaded) {
          const dockStorage = ref.current;
          dockStorage?.setDock(
            devdock.activeDock || new ActiveDockRdo(null, null, null, false, []),
            devdock.defaultStage || ActiveInfo.new(),
            devdock.defaultFirst || false,
            devdock.activeCitizen || devdock.currentCitizen || ActiveInfo.new(),
            devdock.activePavilion || devdock.currentPavilion || ActiveInfo.new(),
            devdock.activeAudience || devdock.currentAudience || ActiveInfo.new(),
            devdock.activeCineroom || devdock.currentCineroom || ActiveInfo.new(),
            devdock.activeActor || devdock.currentActor || ActiveInfo.new(),
            devdock.activeStage || devdock.currentStage || ActiveStage.new(),
            devdock.activeKollection || devdock.currentKollection || ActiveKollection.new(),
            devdock.activeKollectionRoles || devdock.currentStageRoles || [],
            devdock.activeDramaRoles || devdock.currentDramaRoles || [],
            devdock.baseActor || devdock.activeActor || devdock.currentActor || ActiveInfo.new(),
            devdock.baseStage || devdock.activeStage || devdock.currentStage || ActiveStage.new(),
            devdock.baseKollection || devdock.activeKollection || devdock.currentKollection || ActiveKollection.new(),
            devdock.baseKollectionRoles || devdock.activeKollectionRoles || devdock.currentStageRoles || [],
            devdock.baseDramaRoles || devdock.activeDramaRoles || devdock.currentDramaRoles || [],
            development,
          );
        }
      }
    }
  }, [ dock, auth ]);

  if (!development && ref.current && dock.loaded !== ref.current?.loaded) {
    const {
      activeDock,
      defaultStage,
      defaultFirst,
      activePavilion,
      activeCitizen,
      activeCineroom,
      activeAudience,
      activeActor,
      activeStage,
      activeKollection,
      activeKollectionRoles,
      activeDramaRoles = [],
      baseActor,
      baseStage,
      baseKollection,
      baseKollectionRoles,
      baseDramaRoles = [],
      loaded,
    } = ref.current;

    const activeDramaRoleMap: {[key: string]: string[]} = {};
    activeDramaRoles.forEach(activeDramaRole => {
      const [key, value] = activeDramaRole.split(':');
      if (activeDramaRoleMap[key]) {
        if (!activeDramaRoleMap[key].includes(value)) {
          activeDramaRoleMap[key].push(value);
        }
      } else {
        activeDramaRoleMap[key] = [value];
      }
    });

    const baseDramaRoleMap: {[key: string]: string[]} = {};
    baseDramaRoles.forEach(baseDramaRole => {
      const [key, value] = baseDramaRole.split(':');
      if (baseDramaRoleMap[key]) {
        if (!baseDramaRoleMap[key].includes(value)) {
          baseDramaRoleMap[key].push(value);
        }
      } else {
        baseDramaRoleMap[key] = [value];
      }
    });

    setDock({
      ...dock,
      activeDock,
      defaultStage,
      defaultFirst,
      // for legacy start
      currentPavilion: activePavilion,
      currentCitizen: activeCitizen,
      currentCineroom: activeCineroom,
      currentAudience: activeAudience,
      currentActor: activeActor,
      currentStage: activeStage,
      currentKollection: activeKollection,
      currentStageRoles: activeKollectionRoles,
      currentKollectionRoles: activeKollectionRoles,
      currentDramaRoles: activeDramaRoles,
      currentDramaRoleMap: activeDramaRoleMap,
      // for legacy end
      activePavilion,
      activeCitizen,
      activeCineroom,
      activeAudience,
      activeActor,
      activeStage,
      activeKollection,
      activeKollectionRoles,
      activeDramaRoles,
      activeDramaRoleMap,
      baseActor,
      baseStage,
      baseKollection,
      baseKollectionRoles,
      baseDramaRoles,
      baseDramaRoleMap,
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
