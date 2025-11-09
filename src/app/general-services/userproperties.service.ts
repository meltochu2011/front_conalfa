import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

export interface Component_user{
   
      Username: string;
      Rolname: string; 
}

@Injectable({
  providedIn: 'root'
})

export class UserpropertiesService {

  constructor(private cookieuser_properties : CookieService) { }

  set TokenObservableData(userdata: Component_user){
     
       
       this.cookieuser_properties.set('username',userdata.Username,2,'/'  );
       this.cookieuser_properties.set('rolname',userdata.Rolname,2,'/'  );     
          
    }

    //check username
    get TokenObservablecheck(){
     return this.cookieuser_properties.check('username');     
    }

    get TokenObservable(){            
      
       return {Username : this.cookieuser_properties.get('username')}
    }

    //check rolname

    get RolnameObservablecheck(){
     return this.cookieuser_properties.check('rolname');     
    }

    get RolnameObservable(){            
      
       return {Rolname : this.cookieuser_properties.get('rolname')}

      }


}



