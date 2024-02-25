//interfase
export interface User {
  full_name: string;
  age: string;
  login: string;
  password: string;
}//done
export interface Us_1 {
  login: string;
  password: string;
}//done
export interface UsContext {
  full_name?: string;
  age?: string;
  profilePicture?: string;
  id?: string;
  userId?: string;
  friends?: string[];
}//done
export interface Post {
  userId?:string;
  photo?:string;
  title?:string;
  likes?:Array<string>;
  id:string
} //done
export interface IsPostProps {
  posts?: Post[]|any; 
}//done
export interface IsPersonProps {
  person: UsContext;
}//done
export interface IsFriendProps {
  id?: string;
  active?: boolean;
  setActive?: any;
}
