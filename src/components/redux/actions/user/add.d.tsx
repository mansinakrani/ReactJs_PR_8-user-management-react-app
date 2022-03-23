export interface UserData {
   image: Blob | string | null;
    name: string;
    email: string;
    phoneno: string;
    password: string | number;
    cnfpassword: string | number;
}

export interface UserState {
    value: any;
    data: UserData[];
}

export interface UserAction {
    type: string;
    payload: any;
}

export type UserTypes = UserAction;