import { DomainEntity, NameValueList, NameValueType, StringList } from '@nara-way/accent';

class Stage extends DomainEntity {
  name: string;
  cineroomId: string;
  backStageId: string;
  kollectionVersionIds: StringList | null = null;

  constructor(name: string, cineroomId: string, backStageId: string) {
    super();
    this.name = name;
    this.cineroomId = cineroomId;
    this.backStageId = backStageId;
  }

  static fromDomain(domain: Stage): Stage {
    const stage = new Stage(
      domain.name,
      domain.cineroomId,
      domain.backStageId,
    );

    stage.setDomainEntity(domain);
    stage.kollectionVersionIds = domain.kollectionVersionIds ? StringList.fromDomain(domain.kollectionVersionIds) : null;
    return stage;
  }

  static fromDomains(domains: Stage[]): Stage[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static asNameValues(model: Stage): NameValueList {
    return NameValueList.fromModel(Stage, model, {
      name: NameValueType.String,
    });
  }

  static new(): Stage {
    return new Stage('', '', '');
  }

}

export default Stage;
