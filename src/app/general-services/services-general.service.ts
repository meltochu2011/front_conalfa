import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { Lesson } from '../models/lesson';

@Injectable({
  providedIn: 'root'
})


export class ServicesGeneralService {


  constructor(private http: HttpClient) { }


Saveuser(user : User)
{
   
  console.log("Nombres  "+user.nombres);
  console.log("Apellidos  "+user.apellidos);
  console.log("Nombre de usuario  "+user.user_name);
   console.log("Password  "+user.pass);
  console.log("Rol  "+user.rol_name);
  console.log("id estudiante "+user.student_id);
  console.log("id area "+user.area_id);
  console.log("id profesor"+user.profesor_id);
  

    
 
 
 return this.http.post(environment.API_URI+'createuser', user);  

}


Savelesson(lesson : Lesson)
{
   
  console.log("texto  "+lesson.word_text);
  console.log("imagen  "+lesson.image_text);
  console.log("tipo   "+lesson.type);

    
 
 
 return this.http.post(environment.API_URI+'createtasklesson',lesson);  

}


/**OBTENER PRODUCTOS, CON EL PARAMETRO prod_count SE LE INDICA DONDE EMPIEZA LA PAGINACION */
get_alfab(area_id :number){
  
  return this.http.get(environment.API_URI+'getalfab/'+area_id);

}




}
