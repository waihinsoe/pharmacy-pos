export interface User {
  id: number;
  name: string;
  password: string;
  contact_number: string;
  email: string;
  role: Role;
  hire_date: Date;
  created_at: Date;
  updated_at: Date;
}

export interface AuthContextType {
  isLoading: boolean;
  user: User | null;
  fetchAuthData: () => void;
  login: (userCredentials: LoginUserCredentials) => void;
  register: (userCredentials: RegisterUserCredentials) => void;
  logout: () => void;
}

export interface LoginUserCredentials extends User {
  remember: boolean;
}

export interface RegisterUserCredentials extends User {
  agreement: boolean;
}

enum Role {
  CASHIER,
  ADMIN,
}
