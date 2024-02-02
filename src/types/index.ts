//interfase
export interface User {
  full_name: string;
  age: string;
  login: string;
  password: string;
}
export interface Us_1 {
  login: string;
  password: string;
}
export interface UsContext {
  full_name: string;
  age: string;
  profilePicture?: string;
  id: string;
}
export interface PhotoRef {}//unfinished
export interface Post {}//unfinished
export interface IsPostProps {
  posts: any; //change type
}
export interface IsPersonProps {
  person: UsContext;
}
