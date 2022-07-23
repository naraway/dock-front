import { DomainEntity, NameValueList, NameValueType } from '@nara-way/accent';

class Stage extends DomainEntity {
  name: string;
  cineroomId: string;
  backStageId: string;
  base: boolean;
  stageId: string | undefined; // for cdo

  constructor(
    name: string,
    cineroomId: string,
    backStageId: string,
    base: boolean,
  ) {
    super();
    this.name = name;
    this.cineroomId = cineroomId;
    this.backStageId = backStageId;
    this.base = base;
  }

  static fromDomain(domain: Stage): Stage {
    const stage = new Stage(
      domain.name,
      domain.cineroomId,
      domain.backStageId,
      domain.base,
    );

    stage.setDomainEntity(domain);
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
    return new Stage('', '', '', false);
  }

}

export default Stage;
