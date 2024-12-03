export interface AuthState {
    token: string | null ;
    user: { email: string } | null ;
    error: string | null;
}

export const initialAuthState: AuthState = {
    token: null ,
    user: null ,
    error: null ,
}