export class RegisterUserRequest {
  email: string;
  password: string;
  name: string;
}

export class UserResponse {
  email?: string;
  name?: string;
  token?: string | null;
}

export class LoginUserRequest {
  email: string;
  password: string;
}

export class UpdateUserRequest {
  email?: string;
  password?: string;
}
