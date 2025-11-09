import { Component } from '@angular/core';
import { ProfesorService } from 'src/app/services-profesor/profesor.service';
import { JsonwtService } from 'src/app/services-student/jsonwt.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reiniciar-tareas',
  templateUrl: './reiniciar-tareas.component.html',
  styleUrls: ['./reiniciar-tareas.component.css']
})
export class ReiniciarTareasComponent {

constructor(private profesorservice: ProfesorService,private jwt: JsonwtService) { 
 
 
}


  profesor_id: number = 0; 




      repetir_tarea(){
        this.profesor_id = parseInt(this.jwt.TokenObservable.Token);

         this.profesorservice.delete_tareas (this.profesor_id).subscribe(
  res=> {
    /**CAMBIAMOS LA FORMA DEL CURSOR A MODO DEFECTO*/  
   document.body.style.cursor = 'default';

    /*ACA ANTEPONEMOS EL EFECTO DEL CURSOR PORQUE getGallery TAMBIEN TIENE
    EFECTO DE CURSOR*/

    Swal.fire(        
      'Tareas eliminadas satisfactoriamente, puede empezar otro conjunto de tareas!'
    )
  },
  err=> {
      alert("ha surgido un error"+ err);
  }
 )

      }
      

confirmar_reinicio(){

 Swal.fire({
  title: "¿Seguro quiere eliminar las tareas del alfabetizador, las tareas hechas por los alumnos se eliminaran?",
  showDenyButton: true,
  //showCancelButton: true,
  confirmButtonText: "Eliminar tareas del alfabetizador",
  denyButtonText: `Cancelar eliminación de tareas`
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    this.repetir_tarea();
  } 
});


}      




}
