import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import {DishListComponent} from './components/dish-list/dish-list.component';
import {vocalsListComponent} from './components/student/vocals-list/vocals-list.component';
import { SyllableListComponent } from './components/profesor/syllable-list/syllable-list.component';
import { ConsonantsListComponent } from './components/profesor/consonants-list/consonants-list.component';
import { WordsListComponent } from './components/profesor/words-list/words-list.component';

import { LoginuserComponent } from './components/loginuser/loginuser.component';
import { JsonwtService} from './services-student/jsonwt.service';
import { AppComponent } from './app.component';
import { TaskComponent } from './components/student/task/task.component';
import { UsersRegisterComponent } from './components/users-register/users-register.component';
import { PhraseslistComponent } from './components/phraseslist/phraseslist.component';
import { NewLessonComponent } from './components/new-lesson/new-lesson.component';
import { ReportsComponent } from './components/profesor/reports/reports.component';
import { ReiniciarTareasComponent } from './components/reiniciar-tareas/reiniciar-tareas.component';

 const value = JsonwtService;
const routes: Routes = [
  
  {    
    path:'',        
    redirectTo: '/',
    pathMatch:'full'
    
   } ,

   /*Yuujook */
   /*{
    path: 'dishes/begin',
    component:AppComponent

   },*/

   {
    path: 'dishes/login',
    component:LoginuserComponent
   },

   {
    path: 'exercises/task',
    component:TaskComponent
   },

   {
    /**LISTAR vocales */
    path: 'vocals/vocal_list',
    component:vocalsListComponent
   },

   {
     /**LISTAR consonantes */
    path: 'consonants/consonant_list',
    component:ConsonantsListComponent
   },

   {
    /**LISTAR SILABLAS */
   path: 'syllables/syllable_list',
   component:SyllableListComponent
  },

  
   {
   path: 'words/word_list',
   component:WordsListComponent
  },

  
   {
   path: 'phrases/phrase_list',
   component:PhraseslistComponent
  },

  //RUTAS ADMIN

  {
   path: 'admin/createuser',
   component:UsersRegisterComponent
  },

  {
   path: 'admin/createlesson',
   component:NewLessonComponent
  },

   {
   path: 'reports',
   component:ReportsComponent
  },

   {
   path: 'reiniciartareas',
   component:ReiniciarTareasComponent
  },




  /*
  {
  path: 'words/alumnos',
  component:StudentComponent
 },

 {
 path: 'words/profesores',
 component:ProfesorComponent
}*/


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
