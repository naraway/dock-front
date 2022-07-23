import cineroomRoleBook from '../../../cineroom/api-model/CineroomRoleBook';
import { IdNameList } from '@nara-way/accent';

class SessionScene {
  url: string;
  name: string;
  actorId: string;
  cineroomRoleBooks: IdNameList;

  constructor(url: string, name: string, actorId: string, cineroomRoleBooks: IdNameList) {
    this.url = url;
    this.name = name;
    this.actorId = actorId;
    this.cineroomRoleBooks = cineroomRoleBooks;
  }

  static fromDomain(domain: SessionScene): SessionScene {
    const sessionKollectie = new SessionScene(
      domain.url,
      domain.name,
      domain.actorId,
      domain.cineroomRoleBooks,
    );

    return sessionKollectie;
  }

  static fromDomains(domains: SessionScene[]): SessionScene[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default SessionScene;
