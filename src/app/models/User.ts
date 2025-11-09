

export interface User{
    users_id?: number;
    nombres? : string;
    apellidos? : string;
    user_name?: string;
    pass?: string;
    rol_name?: string;
    /**CAMPOS SECUNDARIOS */    
    area_id?: number;
    profesor_id?:number;
    student_id?:number;
    coordinator_id?:number;
   }