import { CodeName, IdName, Kollectie, KollectionRole } from '@nara-way/accent';
import { DockKollection } from '@nara-way/dock-core';

export interface DockContext {
  osid?: string;
  usid?: string;
  pavilion?: SessionWorkspace;
  citizen?: SessionTenant;
  cineroom?: SessionWorkspace;
  audience?: SessionTenant;
  stage?: SessionWorkspace;
  actor?: SessionTenant;
  kollection?: SessionKollection;
  kollections?: SessionKollection[];
  kollectionRoles?: string[];
  dramaRoles?: string[];
  dramaRoleMap?: { [key: string]: string[] };
}

export interface SessionWorkspace extends IdName {}

export interface SessionTenant extends IdName {}

export interface SessionStage extends IdName {
  kollections: DockKollection[];
}

export interface SessionKollection extends CodeName {
  path: string;
  kollecties: Kollectie[];
  kollectionRoles: KollectionRole[];
}
