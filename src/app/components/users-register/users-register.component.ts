import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { ServicesGeneralService } from 'src/app/general-services/services-general.service';
import { Studentservice} from 'src/app/services-student/student.service';
import Swal from 'sweetalert2';
import { ProfesorService } from 'src/app/services-profesor/profesor.service';

@Component({
  selector: 'app-users-register',
  templateUrl: './users-register.component.html',
  styleUrls: ['./users-register.component.css']
})
export class UsersRegisterComponent {

 /**variables y funciones para el campo password */
  password: string = '';
  hidePassword: boolean = true;

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }
/**fin de variables y funciones para el campo password */

  
opcionSeleccionada: string = '';

  opciones_roles = [
    { nombre: 'Alumno', valor: 'a' },
    { nombre: 'Alfabetizador', valor: 'p' },
    { nombre: 'Coordinador', valor: 'c' }
  ];




 user_ins: User =
  {
    users_id:0,
    nombres: '',
    apellidos:'',
    user_name:'',
    pass:'',
    rol_name: '',
    area_id : 0,
    profesor_id: 0,
    student_id: 0,
    coordinator_id: 0,
  };




 registerForm: FormGroup;

  constructor(private fb: FormBuilder, private GeneralService: ServicesGeneralService, private student_service : Studentservice, private profesor_service: ProfesorService) {
    this.registerForm = this.fb.group({

      nombres:['', Validators.required],
      apellidos:['', Validators.required],
      user_name: ['', Validators.required],
      password: ['',Validators.required],
      rol_name: ['',Validators.required],
      area_name: ['',Validators.required],
    });

    this.get_area();

  }

  onSubmit() {
    if (this.registerForm.valid) {

     
      const formData = this.registerForm.value;
    
   
    
     this.user_ins.nombres = formData.nombres;

     this.user_ins.apellidos = formData.apellidos;
     
      this.user_ins.user_name = formData.user_name;
     this.user_ins.pass = formData.password;
    
     this.user_ins.rol_name= formData.rol_name;
     

     this.saveUser();
     

    } else {

      console.log('Formulario inválido');
    
    }
  }



     rol_seleccionado(event: Event){
     
        const selectedValue = (event.target as HTMLSelectElement).value;
  const selectedRol = this.opciones_roles.find((opcion: { valor: string; }) => opcion.valor === selectedValue);

  this.user_ins.rol_name = selectedRol?.valor;

    }

    area_seleccionada(event: Event){
      
      const selectedValue = (event.target as HTMLSelectElement).value;
       const selectedArea = this.area_items.find((area: { area_name: string; }) => area.area_name === selectedValue);

       this.user_ins.area_id = selectedArea.area_id;
       this.get_profesors(selectedArea.area_id);
    }
 
/*tipo_seleccionado(event: any) {
  console.log('Seleccionado:', event.target.value);
}*/


    profesor_seleccionado(event: any) {

       
       // console.log('Seleccionado:', event.target.value);
        this.user_ins.profesor_id =event.target.value;
      
        
  /*const selectedValue = (event.target as HTMLSelectElement).value;
  const selectedId = Number(selectedValue); // 🔁 convertir string a número

  const selectedProfesor = this.profesor_items.find(
    (profesor: { user_rol_id: number }) => profesor.user_rol_id === selectedId
  );

  if (selectedProfesor) {
    this.user_ins.profesor_id = selectedProfesor.user_rol_id;
    // this.user_ins.profesor_id = selectedProfesor.user_rol_id;
    alert('ID del profesor seleccionado: ' + this.user_ins.profesor_id);
  } else {
    alert('⚠️ Profesor no encontrado para ID: ' + selectedValue);
  }*/
}


  saveUser()
  {
      
      
       this.GeneralService.Saveuser(this.user_ins)
     .subscribe(
        res =>{
          
           this.Save_user_alert();
           this.registerForm.reset();

           const selectElementrol = document.getElementById('opcion') as HTMLSelectElement;
           selectElementrol.selectedIndex = 0;

           const selectElementarea = document.getElementById('area_value') as HTMLSelectElement;
           selectElementarea.selectedIndex = 0;

           const selectElementprofesor = document.getElementById('opcion_profesor') as HTMLSelectElement;
           selectElementprofesor.selectedIndex = 0;
          // this.registerForm.patchValue({ opcion_profesor: '' });
          // window.location.reload();

        },
        err => console.log(err)
       //
     )

    
  }



  area_items: any =[];

 public loading_modaldetail_gif : any|boolean;
  no_results : boolean = false;
  
  /**  get_consonants()
  {
    this.consonant_items = [];
    document.body.style.cursor = 'wait';
    this.loading_modaldetail_gif=true;
    this.no_results = false;
  
    this.profesorservice.get_consonants().subscribe(
     
      res=> { 
        this.consonant_items=res;     
        this.loading_modaldetail_gif=false;  
        document.body.style.cursor = 'default';
        console.log(this.consonant_items);      
      },
      err=> {
        
        this.no_results=true,
        this.loading_modaldetail_gif=false,
        document.body.style.cursor = 'default'
        } 
    );
  }

 */

  get_area()
  {
   
    this.area_items = [];
    /**PONER EL CURSOR EN MODO ESPERA */
    document.body.style.cursor = 'wait';
    this.loading_modaldetail_gif=true;
    this.no_results = false;
    
    this.student_service.get_area().subscribe(
     
      res=> { 
        this.area_items=res;     
        this.loading_modaldetail_gif=false;  
        document.body.style.cursor = 'default';

        console.log("Esto se muestra ", this.area_items);      
      },
      err=> {
        
        this.no_results=true,
        this.loading_modaldetail_gif=false,
        document.body.style.cursor = 'default';
        
        } 
    );
  }


      alfab_items: any =[];
/*
    get_alfabetizador()
  {
   
    this.alfab_items = [];
    document.body.style.cursor = 'wait';
    this.loading_modaldetail_gif=true;
    this.no_results = false;
    
    this.GeneralService.get_alfab(this.user_ins.area_id).subscribe(
     
      res=> { 
        this.alfab_items=res;     
        this.loading_modaldetail_gif=false;  
        document.body.style.cursor = 'default';

        console.log("Esto se muestra ", this.alfab_items);      
      },
      err=> {
        
        this.no_results=true,
        this.loading_modaldetail_gif=false,
        document.body.style.cursor = 'default';
        
        } 
    );
  }*/

     /**PRIMERA FUNCIÓN QUE SUSTITUYE A LA LOGICA DE HTML :) 
      * Verificamos que el rol y el id del area estén con valores para que se llene el
      * combobox de profesores ya que para que este se llene el rol tiene que ser estudiante 
      * y el area_id tiene que ser mayor que 1, desde html se llama a isAdminWithArea
     */
    get isAdminWithArea(): boolean {
     return this.user_ins?.rol_name === 'a' && Number(this.user_ins?.area_id) > 0;
     }


     profesor_items: any =[];

get_profesors(area_id : number)
  {
   
    this.profesor_items = [];
    /**PONER EL CURSOR EN MODO ESPERA */
    document.body.style.cursor = 'wait';
    this.loading_modaldetail_gif=true;
    this.no_results = false;
    
    this.profesor_service.get_profesors(area_id).subscribe(
     
      res=> { 
        this.profesor_items=res;     
        this.loading_modaldetail_gif=false;  
        document.body.style.cursor = 'default';

        console.log("Esto se muestra ", this.profesor_items);      
      },
      err=> {
        
        this.no_results=true,
        this.loading_modaldetail_gif=false,
        document.body.style.cursor = 'default';
        
        } 
    );
  }


     Save_user_alert()
     {
       Swal.fire(
       '¡Usuario Creado!',
       'satisfactoriamente!',
       'success'
                )
     }
  

}



