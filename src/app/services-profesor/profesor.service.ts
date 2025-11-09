import { Injectable } from '@angular/core';
import { Task_profesor } from 'src/app/models/Task_profesor';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {



  constructor(private http: HttpClient,) {

   }
  
     
//INSERSION DE TAREA ------------------------------------------
   asign_task (task : Task_profesor)
  {   
    console.log(environment.API_URI+'createtask');
    return this.http.post(environment.API_URI+'createtask',task);
     
  }

  
  get_syllables(){

    return this.http.get(environment.API_URI+'syllable');
  }

   get_words(){

    return this.http.get(environment.API_URI+'word');
  }

  get_vowels(){

    return this.http.get(environment.API_URI+'vocal');
  }

   get_consonants(){

    return this.http.get(environment.API_URI+'consonant');
  }

    get_phrases(){

    return this.http.get(environment.API_URI+'phrase');
  }

  get_detalles_tareas(){

    return this.http.get(environment.API_URI+'get_tasks_details');
  }


  //**OBTENER A LOS PROFESORES DE UN AREA */

  get_profesors(area_id : number){

    return this.http.get(environment.API_URI+'getprofesors/'+area_id);
  }

  
  get_students(profesor_id : number){
     console.log("este es el id del profesor");
    return this.http.get(environment.API_URI+'get_students/'+profesor_id);
  }

    get_detalle_tareas(student_id : number, profesor_id: number ){
     console.log("este es el id del profesor");
    return this.http.get(environment.API_URI+'detalletarea/'+student_id+'/'+profesor_id);
  }


  delete_tareas(profesor_id : number)
  {
    //alert(profesor_id);
    return this.http.delete(environment.API_URI+'deletetareas/'+profesor_id);
  }

   disablelesson(syllable_word_id : number)
  {
    //alert(profesor_id);
    return this.http.delete(environment.API_URI+'disablelesson/'+syllable_word_id);
          
  }

}
