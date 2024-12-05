export interface UserState {
    users: any[] ;
    error: string | null ;
    isLoading: boolean ;
}

export const initialUserState: UserState = {
    users: [] ,
    error: null ,
    isLoading: false ,
}