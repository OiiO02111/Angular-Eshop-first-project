import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";

@Injectable ({
    providedIn: 'root'
})

export class AuthStorageService {


    constructor() {
        console.log('pppp')
    }

    getUserRole() {
        const token  = localStorage.getItem('token');
        const decode: any = jwtDecode(token ? token : '') ;
        console.log('decode =>', decode)
        return decode.role ;
    }
}