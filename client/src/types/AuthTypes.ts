export interface User {
  id: string;
  userName: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userCredentials: UserCredentials) => void;
  logout: () => void;
}

export interface UserCredentials {
  userName: string;
  password: string;
}
