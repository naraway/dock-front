import { IdName, KollectionRole, TenantKeys } from '@nara-way/accent';
import { DockCineroom, DockFlowApi, DockKollection, DockSeekApi, DockStage, SessionDockRdo } from '@nara-way/dock-core';
import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { DevDock, Dock, DockContext, SessionKollection, SessionTenant, SessionWorkspace } from '~/models';
import { devDockAtom, dockAtom } from './stores';
import { useAuth } from './useAuth';

export const useDock = () => {
  const [dev, setDev] = useAtom(devDockAtom);
  const [dock, setDock] = useAtom(dockAtom);
  const { session, context, authorized, development } = dock;
  const { authenticated, user } = useAuth();

  //
  const switchContext = useCallback(
    ({ stageId, url, name }: { stageId?: string; url?: string; name?: string }) => {
      const context = { ...dock.context };
      stageId = stageId ?? context.stage?.id;

      if (!stageId) {
        // throw new Error('Cannot find session stage');
        console.warn('Cannot find session stage');
        return;
      }

      const cineroomId = TenantKeys.stageKey(stageId).cineroomId;
      const nextCineroom = dock.session.cinerooms?.find((cineroom) => cineroom.cineroom?.id === cineroomId);

      if (!nextCineroom) {
        // throw new Error(`Cannot find cineroom, cineroomId = ${cineroomId}`);
        console.warn(`Cannot find cineroom, cineroomId = ${cineroomId}`);
        return;
      }

      if (nextCineroom.audience?.id !== context.audience?.id) {
        context.audience = <SessionTenant>{ ...nextCineroom.audience };
        context.cineroom = <SessionWorkspace>{ ...nextCineroom.cineroom };

        if (!development) {
          try {
            DockFlowApi.modifyLatestCineroom({
              citizenId: context.citizen?.id ?? '',
              latestCineroomId: nextCineroom.cineroom?.id ?? '',
            });
          } catch (e) {}
        }
      }

      const stages: DockStage[] = [];
      (dock.session.cinerooms ?? [])
        .filter((cineroom) => !!cineroom.stages)
        .forEach((cineroom) => stages.push(...(cineroom.stages ?? [])));
      const nextStage = stages.find((stage) => stage.stage?.id === (stageId || context.stage?.id));

      if (!nextStage) {
        // throw new Error(`Cannot find stage, stageId = ${stageId ?? context.stage.id}`);
        console.warn(`Cannot find stage, stageId = ${stageId ?? context.stage?.id}`);
        return;
      }

      let sceneUpdated = false;
      if (nextStage && nextStage.actor?.id !== context.actor?.id) {
        context.actor = <SessionTenant>{ ...nextStage.actor };
        context.stage = <SessionWorkspace>{ ...nextStage.stage };

        // kollection
        const kollections = toKollections(nextStage.kollections ?? []);
        context.kollections = kollections;
        const kollectionRoles: string[] = [];
        kollections.forEach((kollection) => {
          (kollection.kollectionRoles ?? []).forEach((kollectionRole) => {
            kollectionRoles.push(`${kollection.code}:${kollectionRole.code}`);
          });
        });
        context.kollectionRoles = kollectionRoles;

        const nextKollection = getKollection(nextStage.kollections ?? [])?.kollection;

        if (!nextKollection) {
          // throw new Error(`Cannot find kollection, stageId = ${stageId || context.stage.id}`);
          console.warn(`Cannot find kollection, stageId = ${stageId || context.stage?.id}`);
          return;
        }

        context.kollection = nextKollection.kollection;

        // drama
        const dramaRoles = toDramaRoles(nextKollection.kollectionRoles ?? []);
        context.dramaRoles = dramaRoles;
        context.dramaRoleMap = toDramaRoleMap(dramaRoles);

        if (!development) {
          try {
            DockFlowApi.modifyLatestStage({
              audienceId: nextCineroom.audience?.id ?? '',
              latestStageId: nextStage.stage?.id ?? '',
              url: url ?? nextKollection.path,
              name: url ? '' : nextKollection.name,
            });
            sceneUpdated = true;
          } catch (e) {}
        }
      }

      if (url && !sceneUpdated) {
        const nextKollection = (nextStage.kollections ?? []).find((kollection) => url.includes(`${kollection.path}`));

        if (!nextKollection) {
          // throw new Error(`Cannot find kollection, url path = ${url}`);
          console.warn(`Cannot find kollection, url path = ${url}`);
          return;
        }

        // kollection
        if (nextKollection && nextKollection.kollection?.code !== context.kollection?.code) {
          context.kollection = {
            code: nextKollection.kollection?.code ?? '',
            name: nextKollection.kollection?.name ?? '',
            path: nextKollection.path ?? '',
            kollecties: nextKollection.kollecties ?? [],
            kollectionRoles: nextKollection.kollectionRoles ?? [],
          };

          // drama
          const dramaRoles = toDramaRoles(nextKollection.kollectionRoles ?? []);
          context.dramaRoles = dramaRoles;
          context.dramaRoleMap = toDramaRoleMap(dramaRoles);

          if (!development) {
            try {
              DockFlowApi.modifyLatestScene({ actorId: context.actor?.id ?? '', url, name });
            } catch (e) {}
          }
        }
      }

      setDock({ ...dock, context });
    },
    [dock],
  );

  //
  const applyDefaultStage = useCallback(
    async (stageId: string) => {
      if (!stageId) {
        throw new Error('Cannot apply empty stage');
      }

      const audience = dock.context.audience;
      if (!audience?.id) {
        throw new Error('Session audience was not found');
      }

      const defaultStage = dock.session.defaultStage;
      if (!defaultStage?.id) {
        throw new Error('Default stage was not found');
      }

      if (defaultStage.id !== stageId) {
        const stages: DockStage[] = [];
        (dock.session.cinerooms ?? [])
          .filter((cineroom) => !!cineroom.stages)
          .forEach((cineroom) => stages.push(...(cineroom.stages ?? [])));

        const stage = stages.find((stage) => stage.stage?.id === stageId);
        if (!stage) {
          throw new Error(`Cannot find stage, stageId = ${stageId}`);
        }

        if (!development) {
          try {
            DockFlowApi.modifyDefaultStage({
              audienceId: audience.id,
              defaultStageId: stageId,
            });
          } catch (e) {}
        }

        setDock(<Dock>{
          ...dock,
          session: { ...dock.session, defaultStage: <IdName>{ ...stage.stage } },
        });
      }
    },
    [dock],
  );

  //
  const applyDefaultFirst = useCallback(
    async (first: boolean) => {
      const audience = dock.context.audience;
      if (!audience?.id) {
        throw new Error('Session audience was not found');
      }

      const defaultFirst = dock.session.defaultFirstForStage;

      if (defaultFirst !== first) {
        if (!development) {
          try {
            DockFlowApi.modifyDefaultFirstForStage({
              audienceId: audience.id,
              defaultFirst: first,
            });
          } catch (e) {}
        }

        setDock(<Dock>{
          ...dock,
          session: { ...dock.session, defaultFirstForStage: first },
        });
      }
    },
    [dock],
  );

  const _dev_init = useCallback((next: DevDock) => setDev(next), []);
  const _dev_clear = useCallback(() => {
    setDev(null);
    setDock(<Dock>{ session: {}, context: {} });
  }, []);

  if (dev) {
    setDock(initializeDev(dev));
  }

  // initialize session dock when not loaded
  if (!dev && authenticated && user && !authorized) {
    const pavilionId = user.pavilionId;
    const usid = user.username;

    DockSeekApi.findSessionDock({ pavilionId, usid })
      .then((value) => {
        if (!value.data.queryResult) {
          throw new Error('Cannot find session dock');
        }

        const sessionDock = value.data.queryResult;

        const nextDock = <Dock>{
          session: sessionDock,
          context: initializeContext(sessionDock) ?? <DockContext>{},
        };

        setDock(nextDock);
      })
      .catch((e) => {
        throw new Error('Cannot find session dock');
      });
  }

  // clear session dock when unauthorized
  if (!dev && !authenticated) {
    setDock(<Dock>{ session: {}, context: {} });
  }

  return {
    authorized,
    session,
    context,
    // switchStage,
    // switchScene,
    switchContext,
    applyDefaultStage,
    applyDefaultFirst,
    _dev: { init: _dev_init, clear: _dev_clear },
  };
};

//

const initializeDev = (dev: DevDock) => {
  return <Dock>{
    session: dev.session,
    context: initializeContext(dev.session) ?? <DockContext>{},
  };
};

const initializeContext = (session: SessionDockRdo) => {
  // pavilion
  const context = <DockContext>{
    osid: session.osid,
    usid: session.usid,
    pavilion: <SessionWorkspace>{ ...session.pavilion },
    citizen: <SessionWorkspace>{ ...session.citizen },
  };

  // cineroom
  const cineroom = getCineroom(session.cinerooms ?? []);
  if (!cineroom) {
    return;
  }
  context.cineroom = cineroom.workspace;
  context.audience = cineroom.tenant;

  // stage
  const stage = getStage(cineroom.data.stages ?? []);
  if (!stage) {
    return;
  }
  context.stage = stage.workspace;
  context.actor = stage.tenant;

  // kollection
  const kollections = toKollections(stage.data.kollections ?? []);
  context.kollections = kollections;
  const kollectionRoles: string[] = [];
  kollections.forEach((kollection) => {
    (kollection.kollectionRoles ?? []).forEach((kollectionRole) => {
      kollectionRoles.push(`${kollection.code}:${kollectionRole.code}`);
    });
  });
  context.kollectionRoles = kollectionRoles;
  const kollection = getKollection(stage.data.kollections ?? []);
  if (!kollection) {
    return;
  }
  context.kollection = kollection.kollection;

  // drama
  const dramaRoles = toDramaRoles(kollection.data.kollectionRoles ?? []);
  context.dramaRoles = dramaRoles;
  context.dramaRoleMap = toDramaRoleMap(dramaRoles);

  return context;
};

const getCineroom = (cinerooms: DockCineroom[]) => {
  let nextCineroom = cinerooms.find((cineroom) => cineroom.active);
  if (!nextCineroom && cinerooms.length > 0) {
    nextCineroom = cinerooms[0];
  }

  if (!nextCineroom) {
    return undefined;
  }

  return {
    workspace: <SessionWorkspace>{ ...nextCineroom.cineroom },
    tenant: <SessionTenant>{ ...nextCineroom.audience },
    data: nextCineroom,
  };
};

const getStage = (stages: DockStage[]) => {
  let nextStage = stages.find((stage) => stage.active);
  if (!nextStage && stages.length > 0) {
    nextStage = stages[0];
  }

  if (!nextStage) {
    return undefined;
  }

  return {
    workspace: <SessionWorkspace>{ ...nextStage.stage },
    tenant: <SessionTenant>{ ...nextStage.actor },
    data: nextStage,
  };
};

const getKollection = (kollections: DockKollection[]) => {
  let nextKollection = kollections.find((kolleciton) => kolleciton.active);
  if (!nextKollection && kollections.length > 0) {
    nextKollection = kollections[0];
  }

  if (!nextKollection) {
    return undefined;
  }

  return {
    kollection: <SessionKollection>{
      ...nextKollection.kollection,
      path: nextKollection.path,
      kollecties: nextKollection.kollecties,
      kollectionRoles: nextKollection.kollectionRoles,
    },
    data: nextKollection,
  };
};

const toKollections = (kollections: DockKollection[]) => {
  return kollections.map(
    (kollection) =>
      <SessionKollection>{
        ...kollection.kollection,
        path: kollection.path,
        kollecties: kollection.kollecties,
        kollectionRoles: kollection.kollectionRoles,
      },
  );
};

const toDramaRoles = (kollectionRoles: KollectionRole[]) => {
  const dramaRoles: string[] = [];
  if (kollectionRoles) {
    kollectionRoles.forEach((kollectionRole) => {
      kollectionRole.dramaRoles.forEach((role) => dramaRoles.push(`${role.dramaId}:${role.code}`));
    });
  }

  return dramaRoles;
};

const toDramaRoleMap = (dramaRoles: string[]) => {
  const dramaRoleMap: { [key: string]: string[] } = {};
  dramaRoles.forEach((dramaRole) => {
    const [key, value] = dramaRole.split(':');
    if (dramaRoleMap[key]) {
      dramaRoleMap[key].push(value);
    } else {
      dramaRoleMap[key] = [value];
    }
  });

  return dramaRoleMap;
};
