export interface UserInterface {
  user: string;
  skills: string[];
  pet?: string;
}

export interface Dictionary<T> {
  [key: string]: T;
}

export interface Condition {
  [key: string]: (arr: any) => void;
}
