export interface ProductState {
    products: any[] ;
    createProductError: string | null ;
    isLoading: boolean ;
}

export const initialProductState: ProductState = {
    products: [] ,
    createProductError: null ,
    isLoading: false ,
};