export interface AuthorizationResponse {
  readonly access_token: string;
  readonly refresh_token: string;
  readonly scope: string;
  readonly token_type: string;
  readonly expires_in: number;
  readonly password_state: string;
  readonly user_state: string;
}
