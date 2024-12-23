export interface CartState {
    items: any[] ;
    error: string | null ;
    cart: any ;
    
}

export const initialCartState: CartState = {
    items: [] ,
    error: null ,
    cart: null ,

}