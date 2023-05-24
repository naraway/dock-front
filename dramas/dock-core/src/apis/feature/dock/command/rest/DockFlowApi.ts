import { CommandResponse, FirstParameter } from '@nara-way/accent';
import axios from 'axios';
import {
  ModifyDefaultStageCommand,
  ModifyLatestCineroomCommand,
  ModifyLatestSceneCommand,
  ModifyLatestStageCommand,
  ModifyDefaultFirstForStageCommand,
} from '../command';

const url = (path: string) => `/api/metro/feature/dock${path}`;

const modifyLatestCineroom = (variables: { citizenId: string; latestCineroomId: string }) => {
  const command = <ModifyLatestCineroomCommand>{ ...variables };
  return axios.post<CommandResponse>(url('/modify-latest-cineroom/command'), command);
};

const modifyDefaultStage = (variables: { audienceId: string; defaultStageId: string }) => {
  const command = <ModifyDefaultStageCommand>{ ...variables };
  return axios.post<CommandResponse>(url('/modify-default-stage/command'), command);
};

const modifyLatestStage = (variables: { audienceId: string; latestStageId: string; url: string; name: string }) => {
  const command = <ModifyLatestStageCommand>{ ...variables };
  return axios.post<CommandResponse>(url('/modify-latest-stage/command'), command);
};

const modifyDefaultFirstForStage = (variables: { audienceId: string; defaultFirst?: boolean }) => {
  const command = <ModifyDefaultFirstForStageCommand>{ ...variables };
  return axios.post<CommandResponse>(url('/modify-default-first-for-stage/command'), command);
};

const modifyLatestScene = (variables: { actorId: string; url: string; name?: string }) => {
  const command = <ModifyLatestSceneCommand>{ ...variables };
  return axios.post<CommandResponse>(url('/modify-latest-scene/command'), command);
};

export default {
  modifyLatestCineroom,
  modifyDefaultStage,
  modifyLatestStage,
  modifyDefaultFirstForStage,
  modifyLatestScene,
};
