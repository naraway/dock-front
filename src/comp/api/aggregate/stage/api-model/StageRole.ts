import { DomainEntity, DramaRole, NameValueList, NameValueType } from '@nara-way/accent';

class StageRole extends DomainEntity {
  stageId: string;
  kollectionVersionId: string;
  code: string;
  name: string;
  dramaRoles: DramaRole[] = [];
  description: string;
  defaultRole: boolean;

  constructor(stageId: string, kollectionVersionId: string, code: string, name: string, dramaRoles: DramaRole[], description: string, defaultRole: boolean) {
    super();
    this.stageId = stageId;
    this.kollectionVersionId = kollectionVersionId;
    this.code = code;
    this.name = name;
    this.dramaRoles = dramaRoles;
    this.description = description;
    this.defaultRole = defaultRole;
  }

  static fromDomain(domain: StageRole): StageRole {
    const stageRole = new StageRole(
      domain.stageId,
      domain.kollectionVersionId,
      domain.code,
      domain.name,
      domain.dramaRoles,
      domain.description,
      domain.defaultRole,
    );

    stageRole.setDomainEntity(domain);
    return stageRole;
  }

  static fromDomains(domains: StageRole[]): StageRole[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static asNameValues(model: StageRole): NameValueList {
    return NameValueList.fromModel(StageRole, model, {
      code: NameValueType.String,
      name: NameValueType.String,
      dramaRoles: NameValueType.Json,
      description: NameValueType.String,
      defaultRole: NameValueType.String,
    });
  }

  static new(): StageRole {
    return new StageRole('', '', '', '', [], '', false);
  }

}

export default StageRole;
