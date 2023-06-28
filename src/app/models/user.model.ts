import { RoleModel } from './role.model';

export class UserModel{
    email:string;
    mobile: string;
    username:string; 
    empCode: string;
    firstName: string;
    lastName: string;
    password: string;
    role:RoleModel
    id:number;
}
