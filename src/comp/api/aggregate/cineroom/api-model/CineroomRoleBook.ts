import { NameValueList, DomainEntity } from '@nara-way/accent';
import { CineroomRole } from '~/comp';


class CineroomRoleBook extends DomainEntity {
  name: string;
  description: string;
  cineroomRoles: CineroomRole[] = [];
  cineroomId: string;

  constructor(name: string, description: string, cineroomId: string) {
    super();
    this.name = name;
    this.description = description;
    this.cineroomId = cineroomId;
  }

  static fromDomain(domain: CineroomRoleBook): CineroomRoleBook {
    const cineroomRoleBook = new CineroomRoleBook(
      domain.name,
      domain.description,
      domain.cineroomId,
    );

    cineroomRoleBook.setDomainEntity(domain);
    cineroomRoleBook.cineroomRoles = domain.cineroomRoles ? CineroomRole.fromDomains(domain.cineroomRoles) : [];
    return cineroomRoleBook;
  }

  static fromDomains(domains: CineroomRoleBook[]): CineroomRoleBook[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static asNameValues(model: CineroomRoleBook): NameValueList {
    return NameValueList.fromModel(CineroomRoleBook, model, {
      name: String,
      description: String,
      cineroomRoles: 'Json',

    });
  }

  static new(): CineroomRoleBook {
    return new CineroomRoleBook('', '', '');
  }

}

export default CineroomRoleBook;

