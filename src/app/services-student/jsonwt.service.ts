import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { environment } from 'src/environments/environment';
import {CookieService} from 'ngx-cookie-service';
//import Ruta from '@angular/router';

export interface Cookie_token{
 
  /**INDICA LA DIRECCION EXACTA, UNICAMENTE SE USO PARA MOSTRAR */
  Token : string;
  Rolname : string;
  Nombres : string;
  Apellidos: string;
  Tareas_number : number;
}


@Injectable({
  providedIn: 'root'
})

export class JsonwtService {

  constructor(private cookieuser : CookieService) { }
  
  /*private TokenObservablePrivate : BehaviorSubject<Component_token> = 
  new BehaviorSubject <Component_token>({ Token : ''});*/
   
  
    get Clean(){
    
  try {
    //this.cookieuser.delete('userkey','/dishes');     
    this.cookieuser.delete('userkey','/') 

    return {value : true} 
  } catch (error) {
    console.log(error);
    return {value : false} 
  }
     
  }

    get NombresObservable(){            
      
       return {Nombres : this.cookieuser.get('nombres')}
    }
   
    get ApellidosObservable(){            
      
       return {Apellidos : this.cookieuser.get('apellidos')}
    }
  
    get TokenObservable(){            
      
       return {Token : this.cookieuser.get('userkey')}
    }

    get Rolname_Observable(){            
      
       return {Rolname : this.cookieuser.get('rolname')}
    }

    get Tareas_number_Observable(){            
      
       return {Tareas_number : this.cookieuser.get('Tareas_number')}
    }

    /**ESTA FUNCIÓN LE PERMITE INSERTAR UN DATO DENTRO DE LA COOKIE
     * EN EL EJEMPLO SE INSERTA EN LA COOKIE EL DATO PROVENIENTE DE data QUE ES DE TIPO Cookie_token
     * Y LO INSERTA EN LA DICECCIÓN "/" QUE ES LA DIRECCIÓN DE INICIO EN EL SITIO
     * ESTA DIRECCIÓN PERTENECE A LA QUE ANGULAR TIENE AL INICIO PERO PUEDE CONFIGURARSE
    */
    set TokenObservableData(data: Cookie_token){
        
       
       //this.cookieuser.set('userkey',data.Token,2,'/dishes'  );
       this.cookieuser.set('userkey',data.Token,2,'/'  );
       
       /**INSERTAMOS EL ROL DENTRO DE LA COOKIE "rolname" */
       this.cookieuser.set('rolname',data.Rolname,2,'/');    
        
       this.cookieuser.set('nombres',data.Nombres,2,'/'  );
       
       this.cookieuser.set('apellidos',data.Apellidos,2,'/');    
       
       this.cookieuser.set('Tareas_number',''+data.Tareas_number,2,'/');    
    
      }

    get TokenObservablecheck(){
     return this.cookieuser.check('userkey');     
    }

       get RolnameObservablecheck(){
     return this.cookieuser.check('rolname');     
    }    

     get NombresObservablecheck(){
     return this.cookieuser.check('nombres');     
    }

       get ApellidosObservablecheck(){
     return this.cookieuser.check('apellidos');     
    }    
    
}
