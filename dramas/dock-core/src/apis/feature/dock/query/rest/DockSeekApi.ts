import { FirstParameter, QueryResponse } from '@nara-way/accent';
import axios from 'axios';
import { SessionDockRdo, Actor, Audience, CineDock, Cineroom, Stage, StageDock } from '../../../../../models';
import {
  FindSessionActorQuery,
  FindSessionAudienceQuery,
  FindSessionCineDockQuery,
  FindSessionCineroomQuery,
  FindSessionDockQuery,
  FindSessionStageDockQuery,
  FindSessionStageQuery,
  FindDefaultCineroomQuery,
  FindDefaultStageQuery,
} from '../query';

const url = (path: string) => `/api/metro/feature/dock${path}`;

const findSessionCineDock = <T = CineDock>(params: { citizenId: string }) => {
  const query = <FindSessionCineDockQuery>{ ...params };
  return axios.post<QueryResponse<T>>(url('/find-session-actor/query'), query);
};

const findSessionStageDock = <T = StageDock>(params: { audienceId: string }) => {
  const query = <FindSessionStageDockQuery>{ ...params };
  return axios.post<QueryResponse<T>>(url('/find-session-stage-dock/query'), query);
};

const findSessionDock = <T = SessionDockRdo>(params: {
  citizenUserId?: string;
  usid?: string;
  pavilionId?: string;
}) => {
  const query = <FindSessionDockQuery>{ ...params };
  return axios.post<QueryResponse<T>>(url('/find-session-dock/query'), query);
};

const findSessionActor = <T = Actor>(params: { audienceId: string }) => {
  const query = <FindSessionActorQuery>{ ...params };
  return axios.post<QueryResponse<T>>(url('/find-session-actor/query'), query);
};

const findSessionAudience = <T = Audience>(params: { citizenId: string }) => {
  const query = <FindSessionAudienceQuery>{ ...params };
  return axios.post<QueryResponse<T>>(url('/find-session-audience/query'), query);
};

const findSessionCineroom = <T = Cineroom>(params: { citizenId: string }) => {
  const query = <FindSessionCineroomQuery>{ ...params };
  return axios.post<QueryResponse<T>>(url('/find-session-cineroom/query'), query);
};

const findSessionStage = <T = Stage>(params: { audienceId: string }) => {
  const query = <FindSessionStageQuery>{ ...params };
  return axios.post<QueryResponse<T>>(url('/find-session-stage/query'), query);
};

const findDefaultCineroom = <T = Cineroom>(params: { citizenId: string }) => {
  const query = <FindDefaultCineroomQuery>{ ...params };
  return axios.post<QueryResponse<T>>(url('/find-default-cineroom/query'), query);
};

const findDefaultStage = <T = Stage>(params: { audienceId: string }) => {
  const query = <FindDefaultStageQuery>{ ...params };
  return axios.post<QueryResponse<T>>(url('/find-default-stage/query'), query);
};

export default {
  findSessionCineDock,
  findSessionStageDock,
  findSessionDock,
  findSessionActor,
  findSessionAudience,
  findSessionCineroom,
  findSessionStage,
  findDefaultCineroom,
  findDefaultStage,

  query: {
    findSessionCineDock: (params: FirstParameter<typeof findSessionCineDock>) => ({
      queryKey: ['DockSeek', 'findSessionCineDock', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) =>
        (await findSessionCineDock(queryKey.slice().pop()))?.data,
    }),
    findSessionStageDock: (params: FirstParameter<typeof findSessionStageDock>) => ({
      queryKey: ['DockSeek', 'findSessionStageDock', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) =>
        (await findSessionStageDock(queryKey.slice().pop()))?.data,
    }),
    findSessionDock: (params: FirstParameter<typeof findSessionDock>) => ({
      queryKey: ['DockSeek', 'findSessionDock', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) =>
        (await findSessionDock(queryKey.slice().pop()))?.data,
    }),
    findSessionActor: (params: FirstParameter<typeof findSessionActor>) => ({
      queryKey: ['ContextSeek', 'findSessionActor', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) =>
        (await findSessionActor(queryKey.slice().pop()))?.data,
    }),
    findSessionAudience: (params: FirstParameter<typeof findSessionAudience>) => ({
      queryKey: ['ContextSeek', 'findSessionAudience', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) =>
        (await findSessionAudience(queryKey.slice().pop()))?.data,
    }),
    findSessionCineroom: (params: FirstParameter<typeof findSessionCineroom>) => ({
      queryKey: ['ContextSeek', 'findSessionCineroom', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) =>
        (await findSessionCineroom(queryKey.slice().pop()))?.data,
    }),
    findSessionStage: (params: FirstParameter<typeof findSessionStage>) => ({
      queryKey: ['ContextSeek', 'findSessionStage', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) =>
        (await findSessionStage(queryKey.slice().pop()))?.data,
    }),
    findDefaultCineroom: (params: FirstParameter<typeof findDefaultCineroom>) => ({
      queryKey: ['ContextSeek', 'findDefaultCineroom', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) =>
        (await findDefaultCineroom(queryKey.slice().pop()))?.data,
    }),
    findDefaultStage: (params: FirstParameter<typeof findDefaultStage>) => ({
      queryKey: ['ContextSeek', 'findDefaultStage', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) =>
        (await findDefaultStage(queryKey.slice().pop()))?.data,
    }),
  },
};
