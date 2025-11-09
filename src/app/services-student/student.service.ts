import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Category} from '../models/Category'

import { Gallery_element } from '../models/Gallery_element';
import {environment} from 'src/environments/environment';
import { Userload } from '../models/Userload';
import { JsonwtService } from './jsonwt.service';
import { Task } from '../models/Task';





@Injectable({
  providedIn: 'root'
})
export class Studentservice {

  
  constructor(private http: HttpClient,private jwservice : JsonwtService) { }

  /*yuujook*/

getCategories(){
  /**SIRVEN PARA MOSTRAR EL MODAL DE CATEGORÍAS A LAS QUE VA A PERTENECER UN PRODUCTO
   * A LA HORA DE CREAR UN NUEVO PLATILLO
*/
const token = this.jwservice.TokenObservable;   
const headers = new HttpHeaders().set('Authorization','Bearer '+token.Token);

  return this.http.get(environment.API_URI+'categories', {headers: headers});
} 



/**OBTENER PRODUCTOS, CON EL PARAMETRO prod_count SE LE INDICA DONDE EMPIEZA LA PAGINACION */
getProducts(prod_count :string){
  const token = this.jwservice.TokenObservable; 
   const headers = new HttpHeaders().set('Authorization','Bearer '+token.Token)  
  return this.http.get(environment.API_URI+'getproducts/'+prod_count, {headers: headers});
}







deleteDish(id:string){
  const token = this.jwservice.TokenObservable; 
  const headers = new HttpHeaders().set('Authorization','Bearer '+token.Token)
  return this.http.delete(environment.API_URI+"productsdelete/"+id,{headers: headers});          
}


  get_phrases(){

    return this.http.get(environment.API_URI+'phrase');
  }

  
  get_syllables(){

    return this.http.get(environment.API_URI+'syllable');
  }
 

 get_area(){

    return this.http.get(environment.API_URI+'getarea');
  }



/**AUTENTICAR ADMIN */
 autentication(user_data: Userload){
  //console.log("Front todo en orden ",user_data.user_name,user_data.user_pass);

   return this.http.post(environment.API_URI+'admin/user',user_data);
  }




/**OBTENER TAREA ASIGNADA */

get_task(){

  return this.http.get(environment.API_URI+'gettask');
}

/*REGISTRAR TAREA */

registrar_tarea(task : Task)
{
   console.log(task);

  return this.http.post(environment.API_URI+'savestudenttask',task);
}

//INSERSION DE TAREA ------------------------------------------
   asign_task (task : Task)
  {   
    console.log(task);

    console.log(environment.API_URI+'createtask');
    return this.http.post(environment.API_URI+'createtask',task);
     
  }


}
