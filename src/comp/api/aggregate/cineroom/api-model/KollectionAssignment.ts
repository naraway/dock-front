import { DomainEntity, NameValueList } from '@nara-way/accent';
import { AssignedKollection } from './vo';

class KollectionAssignment extends DomainEntity {
  cineroomId: string;
  kollection: AssignedKollection | null = null;

  constructor(cineroomId: string) {
    super();
    this.cineroomId = cineroomId;
  }

  static fromDomain(domain: KollectionAssignment): KollectionAssignment {
    const kollectionAssignment = new KollectionAssignment(
      domain.cineroomId,
    );

    kollectionAssignment.setDomainEntity(domain);
    kollectionAssignment.kollection = domain.kollection ? AssignedKollection.fromDomain(domain.kollection) : null;
    return kollectionAssignment;
  }

  static fromDomains(domains: KollectionAssignment[]): KollectionAssignment[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static asNameValues(model: KollectionAssignment): NameValueList {
    return NameValueList.fromModel(KollectionAssignment, model, {});
  }

  static new(): KollectionAssignment {
    return new KollectionAssignment('');
  }

}

export default KollectionAssignment;
