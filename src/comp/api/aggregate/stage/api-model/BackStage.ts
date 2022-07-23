import { DomainEntity, NameValueList, NameValueType } from '@nara-way/accent';

class BackStage extends DomainEntity {
  name: string;
  parentId: string;
  chartId: string;
  backStageSequence: number | undefined; // for cdo

  constructor(name: string, parentId: string, chartId: string) {
    super();
    this.name = name;
    this.parentId = parentId;
    this.chartId = chartId;
  }

  static fromDomain(domain: BackStage): BackStage {
    const backStage = new BackStage(
      domain.name,
      domain.parentId,
      domain.chartId,
    );

    backStage.setDomainEntity(domain);
    return backStage;
  }

  static fromDomains(domains: BackStage[]): BackStage[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static asNameValues(model: BackStage): NameValueList {
    return NameValueList.fromModel(BackStage, model, {
      name: NameValueType.String,
    });
  }

  static new(): BackStage {
    return new BackStage('', '', '');
  }

}

export default BackStage;
