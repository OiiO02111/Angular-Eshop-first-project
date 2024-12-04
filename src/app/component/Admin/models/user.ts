export class User {
    id: number | null ;
    name: string ;
    email: string ;
    role: string ;
    constructor(
        id: number | null =  null ,
        name: string = '' ,
        email: string = '' ,
        role: string = 'USER' ,
    ) {
        this.id = id ;
        this.name = name ;
        this.email = email ;
        this.role = role ;
    }
}