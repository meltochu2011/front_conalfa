import { Component, OnInit } from '@angular/core';
import { Userload } from 'src/app/models/Userload';
import { Studentservice } from 'src/app/services-student/student.service';

import {Cookie_token, JsonwtService} from 'src/app/services-student/jsonwt.service'
import { Component_user, UserpropertiesService } from 'src/app/general-services/userproperties.service';
import {  delay, Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.component.html',
  styleUrls: ['./loginuser.component.css'],
  //standalone: true,
  
})



export class LoginuserComponent implements OnInit {
 
  
  
  hide = true;

     value : boolean = false;

  constructor(private studentservice: Studentservice, private tokenSvc : JsonwtService, private userproperty_service: UserpropertiesService, private router: Router) { 
      this.value = this.tokenSvc.TokenObservablecheck;
              
        
        
        if(this.value == false )
        {
           this.tokenvalue ="";
        }
       
        else if(this.value != true)
        {
            this.tokenvalue = this.tokenSvc.TokenObservable;      
        }
        

  }

  ngOnInit(): void {
   
  }

  Userdata: Userload =
  {
    user_name:'',
    user_pass:'',
    nombres:'',
    apellidos: ''
  };

  
  
  
    access_result : any;
    public loading : any|boolean;
    rolname : string = "";



    Token$: Observable<Cookie_token> | undefined;
    //value: Subscription | undefined;
    tokenvalue : string | any; 
  login_account()
  {
              /*alert(this.Userdata.user_name);*/
       this.loading = true;
       this.studentservice.autentication(this.Userdata)
       .subscribe(
        async res =>{
          this.access_result = res;
         
          if(this.access_result.token == "notloggedin"){
           
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "error",
              title: "Usuario o contraseña invalidas"
            });

             this.Userdata.user_name = "";
             this.Userdata.user_pass = "";

          }  

           else{

            console.log("Este es el arreglo de usuario ",this.access_result);


            this.tokenSvc.TokenObservableData = {Token : this.access_result.token, Rolname : this.access_result.rol_name, Nombres : this.access_result.nombres, Apellidos : this.access_result.apellidos, Tareas_number : 0}
            
            this.userproperty_service.TokenObservableData = { Username : this.access_result.user_name, 
              Rolname : this.access_result.rol_name}

              this.rolname = this.access_result.rol_name;
              

             if(this.rolname === "p")
              {
                console.log("es p");
               this.router.navigate(['vocals/vocal_list']);
               this.router.navigate(['syllables/syllable_list']);
               
               await delay(1500);
               window.location.reload();
              }  

            if(this.rolname === 'a')
            {
               console.log("es a");
               this.router.navigate(['exercises/task']);
               await delay(1500);
               window.location.reload();
              
            }

              if(this.rolname === 'c')
            {
               console.log("es a");
               this.router.navigate(['admin/createuser']);
               await delay(1500);
               window.location.reload();
              
            }
             
           }
           
             
          this.loading= false
          
        },
        
        err =>
        {
         console.log(err);
         this.loading = false;
         alert("Ha ocurrido un error, revise su conexion de internet");         
        }
       )
  }

  login_validate_access()
  {
      
       if(this.Userdata.user_name == "" ||  this.Userdata.user_pass == "" || this.Userdata.user_name == null ||  this.Userdata.user_pass == null)  
       {
        /*Swal.fire({
          icon: "error",
          title: "Hay campos vacíos",
          text: "Por favor complete el usuario y la contraseña!",
          footer: '<a href="#">Campos incompletos</a>'
        });*/

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: "Ingrese usuario y contraseña"
        });
        
       }   
  
       else
       {
        this.login_account();
       }
  }

}


