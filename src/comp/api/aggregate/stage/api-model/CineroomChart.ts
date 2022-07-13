import { DomainEntity, NameValueList } from '@nara-way/accent';
import { Creator } from '~/comp';

class CineroomChart extends DomainEntity {
  name: string;
  cineroomId: string;
  stageSequence: number;
  backStageSequence: number;
  creator: Creator | null = null;

  constructor(name: string, cineroomId: string, stageSequence: number, backStageSequence: number) {
    super();
    this.name = name;
    this.cineroomId = cineroomId;
    this.stageSequence = stageSequence;
    this.backStageSequence = backStageSequence;
  }

  static fromDomain(domain: CineroomChart): CineroomChart {
    const cineroomChart = new CineroomChart(
      domain.name,
      domain.cineroomId,
      domain.stageSequence,
      domain.backStageSequence,
    );

    cineroomChart.setDomainEntity(domain);
    cineroomChart.creator = domain.creator ? Creator.fromDomain(domain.creator) : null;
    return cineroomChart;
  }

  static fromDomains(domains: CineroomChart[]): CineroomChart[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static asNameValues(model: CineroomChart): NameValueList {
    return NameValueList.fromModel(CineroomChart, model, {});
  }

  static new(): CineroomChart {
    return new CineroomChart('', '', 0, 0);
  }

}

export default CineroomChart;
