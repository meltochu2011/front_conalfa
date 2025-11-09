import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/student/navigation-student/navigation-student.component';
//import { DishService } from './services-student/student.service';
import { ProfesorService } from './services-profesor/profesor.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

//import { DishListComponent } from './components/dish-list/dish-list.component';
import { FormsModule} from '@angular/forms';

//import { CategoriesComponent } from './components/categories/categories.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule,MatListOption} from '@angular/material/list'; 
import { ReactiveFormsModule} from '@angular/forms';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { vocalsListComponent, } from './components/profesor/vocals-list/vocals-list.component';
import { FooterCompComponent } from './components/footer-comp/footer-comp.component';
import { WordsListComponent } from './components/profesor/words-list/words-list.component';

import { CoreModule} from './core/core.module';

import { LoginuserComponent } from './components/loginuser/loginuser.component';
import { CookieService } from 'ngx-cookie-service';

import { WebSocketService } from './services-student/web-socket.service';

//import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SppinerInterceptor } from './components/sppiner-interceptor';
/**INICIO */

import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { JsonwtService } from './services-student/jsonwt.service';
import { MatIconModule } from '@angular/material/icon';
import { TaskComponent } from './components/student/task/task.component';
import { SyllableListComponent } from './components/profesor/syllable-list/syllable-list.component';
import { ConsonantsListComponent } from './components/profesor/consonants-list/consonants-list.component';
import { NavigationProfesorComponent } from './components/profesor/navigation-profesor/navigation-profesor.component';
import { UsersRegisterComponent } from './components/users-register/users-register.component';
import { PhraseslistComponent } from './components/phraseslist/phraseslist.component';
import { NewLessonComponent } from './components/new-lesson/new-lesson.component';
import { NavigationCoordinatorComponent } from './components/Coordinator/navigation-coordinator/navigation-coordinator.component';
import { ReportsComponent } from './components/profesor/reports/reports.component';
import { ReiniciarTareasComponent } from './components/reiniciar-tareas/reiniciar-tareas.component';







@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    
    //DishListComponent, 
    //CategoriesComponent,
    ConsonantsListComponent,
    SyllableListComponent,
    vocalsListComponent,   
    WordsListComponent,
    FooterCompComponent,

    LoginuserComponent,
  
    SpinnerComponent,
    TaskComponent,
    NavigationProfesorComponent,
    UsersRegisterComponent,
    PhraseslistComponent,
    NewLessonComponent,
    NavigationCoordinatorComponent,
    ReportsComponent,
    ReiniciarTareasComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatListModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    CoreModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule,
   
   
  ],
  providers: [ProfesorService,CookieService,WebSocketService,JsonwtService, 
  {provide : HTTP_INTERCEPTORS, useClass: SppinerInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
