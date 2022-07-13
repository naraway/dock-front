import { validationUtils } from '@nara-way/prologue';
import { CineDock, SessionAudience, SessionCineroom } from '~/comp';

class CineDockCdo {
  audience: SessionAudience;
  cineroom: SessionCineroom;

  constructor(audience: SessionAudience, cineroom: SessionCineroom) {
    this.audience = audience;
    this.cineroom = cineroom;
  }

  static fromModel(domain: CineDock): CineDockCdo {
    const params = validationUtils.checkNullableParams<CineDock, keyof CineDock>(
      domain,
      [
        'audience',
        'cineroom',
      ],
    );

    return new CineDockCdo(
      params.audience,
      params.cineroom,
    );
  }
}

export default CineDockCdo;
