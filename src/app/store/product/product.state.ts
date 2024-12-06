export interface ProductState {
    products: any[] ;
    error: string | null ;
    isLoading: boolean ;
}

export const initialProductState: ProductState = {
    products: [] ,
    error: null ,
    isLoading: false ,
};