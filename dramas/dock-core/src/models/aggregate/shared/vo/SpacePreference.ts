import { LangSettings, ValueObject } from '@nara-way/accent';

export interface SpacePreference extends ValueObject {
  zoneId?: string;
  langSettings?: LangSettings;
}
