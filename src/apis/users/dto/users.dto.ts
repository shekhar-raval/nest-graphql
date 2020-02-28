export class RegisterDTO {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export class LoginDTO {
  readonly email: string;
  readonly password: string;
}