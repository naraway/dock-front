import { CommandResponse } from '@nara-way/accent';
import { ApiClient, autobind } from '@nara-way/prologue';
import {
  ModifyDefaultStageCommand,
  ModifyLatestCineroomCommand,
  ModifyLatestSceneCommand,
  ModifyLatestStageCommand,
  ToggleDefaultFirstForStageCommand,
} from '../command';

class ContextFlowApiStub {
  private static _instance: ContextFlowApiStub;

  static get instance() {
    if (!ContextFlowApiStub._instance) {
      ContextFlowApiStub._instance = new ContextFlowApiStub();
    }
    return ContextFlowApiStub._instance;
  }

  constructor() {
    autobind(this);
  }

  private readonly client = new ApiClient('/api/town/feature/context');

  async modifyLatestCineroom(
    citizenId: string,
    latestCineroomId: string,
  ): Promise<CommandResponse> {
    const command = ModifyLatestCineroomCommand.new(
      citizenId,
      latestCineroomId,
    );
    return this.client.postNotNull<CommandResponse>(
      CommandResponse,
      '/modify-latest-cineroom/command',
      command,
    );
  }

  async modifyDefaultStage(
    audienceId: string,
    defaultStageId: string,
  ): Promise<CommandResponse> {
    const command = ModifyDefaultStageCommand.new(
      audienceId,
      defaultStageId,
    );
    return this.client.postNotNull<CommandResponse>(
      CommandResponse,
      '/modify-default-stage/command',
      command,
    );
  }

  async modifyLatestStage(
    audienceId: string,
    latestStageId: string,
    url: string,
    name: string,
  ): Promise<CommandResponse> {
    const command = ModifyLatestStageCommand.new(
      audienceId,
      latestStageId,
      url,
      name,
    );
    return this.client.postNotNull<CommandResponse>(
      CommandResponse,
      '/modify-latest-stage/command',
      command,
    );
  }

  async toggleDefaultFirstForStage(
    audienceId: string,
    defaultFirst: boolean,
  ): Promise<CommandResponse> {
    const command = ToggleDefaultFirstForStageCommand.new(
      audienceId,
      defaultFirst,
    );
    return this.client.postNotNull<CommandResponse>(
      CommandResponse,
      '/toggle-default-first-for-stage/command',
      command,
    );
  }

  async modifyLatestScene(
    actorId: string,
    url: string,
    name: string,
  ): Promise<CommandResponse> {
    const command = ModifyLatestSceneCommand.new(
      actorId,
      url,
      name,
    );
    return this.client.postNotNull<CommandResponse>(
      CommandResponse,
      '/modify-latest-scene/command',
      command,
    );
  }

}

export default ContextFlowApiStub;
