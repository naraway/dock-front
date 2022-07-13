import { validationUtils } from '@nara-way/prologue';
import { CineDockHistory, SessionAudience, SessionCineroom } from '~/comp';

class CineDockHistoryCdo {
  audience: SessionAudience;
  cineroom: SessionCineroom;

  constructor(audience: SessionAudience, cineroom: SessionCineroom) {
    this.audience = audience;
    this.cineroom = cineroom;
  }

  static fromModel(domain: CineDockHistory): CineDockHistoryCdo {
    const params = validationUtils.checkNullableParams<CineDockHistory, keyof CineDockHistory>(
      domain,
      [
        'audience',
        'cineroom',
      ],
    );

    return new CineDockHistoryCdo(
      params.audience,
      params.cineroom,
    );
  }
}

export default CineDockHistoryCdo;
