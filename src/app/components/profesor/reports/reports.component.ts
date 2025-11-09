import { Component } from '@angular/core';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ProfesorService } from 'src/app/services-profesor/profesor.service';
import { JsonwtService } from 'src/app/services-student/jsonwt.service';
import { User_reports } from 'src/app/models/User_reports';
import { delay, Observable } from 'rxjs';
import { WebSocketService } from 'src/app/services-student/web-socket.service';




const vfs = (pdfFonts as any).pdfMake?.vfs || (pdfFonts as any).vfs;
(pdfMake as any).vfs = vfs;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

    
 
   constructor(private profesor_service: ProfesorService, private websocketservice : WebSocketService, private tokenSvc : JsonwtService){
      
    
    //this.user_report_ins.profesor_id =  parseInt(this.jwt_service.TokenObservable.Token);
    
    
   /* alert(jwt_service.TokenObservable.Token);*/
    this.get_students();
       
   }

 
  


      opciones_roles = [
    { nombre: 'Alumno', valor: 'a' },
    { nombre: 'Alfabetizador', valor: 'p' },
    { nombre: 'Coordinador', valor: 'c' }
  ];


  detalles_tareas_items: any =[];
   public loading_modaldetail_gif : any|boolean;
     no_results : boolean = false;

     students_items: any =[];


     profesor_id : number  = 0;
     student_id: number = 0;

     nombres_profesor : string = '';
     apellidos_profesor : string = '';
     
   
    get_students()
  {
       
        this.profesor_id = parseInt(this.tokenSvc.TokenObservable.Token);
        this.nombres_profesor = this.tokenSvc.NombresObservable.Nombres;
        this.apellidos_profesor = this.tokenSvc.ApellidosObservable.Apellidos;
  
        

    this.students_items = [];
   
    document.body.style.cursor = 'wait';
    this.loading_modaldetail_gif=true;
    this.no_results = false;
    
    this.profesor_service.get_students(this.profesor_id).subscribe(
     
      res=> { 
        this.students_items=res;     
        this.loading_modaldetail_gif=false;  
        document.body.style.cursor = 'default';

        console.log("Esto se muestra ", this.students_items);      
      },
      err=> {
        
        this.no_results=true,
        this.loading_modaldetail_gif=false,
        document.body.style.cursor = 'default';
        
        } 
    );
  }

 
  nombres_alumno: string = '';
  apellidos_alumno: string = '';

  alumno_seleccionado(event: Event){
     
        const selectedValue = (event.target as HTMLSelectElement).value;
  const selectedRol = this.students_items.find((students: { user_rol_id: number; nombres: string; apellidos: string; }  ) => students.user_rol_id === parseInt( selectedValue));
      
      this.student_id = parseInt(selectedValue);
      this.nombres_alumno = selectedRol.nombres;
      this.apellidos_alumno = selectedRol.apellidos;
      //alert(selectedRol.nombres);
        

      this.get_detalle_tareas();
      

       
    }

    tareas_items_copia: any = [];
    tareas_items: any =[];

   get_detalle_tareas(){
    
        console.log("se esta obteniendo esto ",this.profesor_id);
        

    this.tareas_items = [];
   
    document.body.style.cursor = 'wait';
    this.loading_modaldetail_gif=true;
    this.no_results = false;
    
    this.profesor_service.get_detalle_tareas(this.student_id, this.profesor_id).subscribe(
     
      res=> { 
        this.tareas_items=res;     
        this.loading_modaldetail_gif=false;  
        document.body.style.cursor = 'default';

  
       
      //CODIGO MUY APARTE DE LA CONSULTA, UNICAMENTE ES PARA RECORRER EL ARRAY
        this.tareas_items_copia = this.tareas_items;

      for (const item of this.tareas_items_copia) {
        if(item.type === "s")
        {
                item.type = "Sílaba";
              
        }

        else if(item.type === "w")
        {
                item.type = "Palabra";
              
        }

        else if(item.type === "p")
        {
                item.type = "Frase";
              
        }
       
      }
      console.log("este es el array ",this.tareas_items_copia);

       //FIN DE CODIGO PARA RECORRER CONSULTA

      },
      err=> {
        
        this.no_results=true,
        this.loading_modaldetail_gif=false,
        document.body.style.cursor = 'default';
        
        } 
    );

   }
    


generarPDF() {
  if (!this.tareas_items_copia || this.tareas_items_copia.length === 0) {
    alert('El alumno no tiene tareas hechas');
    return;
  }

  console.log('detalles_tareas_items', this.tareas_items_copia);

  const filas = this.tareas_items_copia.map((f: any) => [f.word_text, f.type]);

  const documentDefinition = {
    content: [
       { text:'REPORTE DE TAREAS HECHAS', style: 'header' },

       {  text:'Alfabetizador: '+this.nombres_profesor+' '+this.apellidos_profesor, style: 'header' },
      {  text:'Nombre del alumno: '+this.nombres_alumno+' '+this.apellidos_alumno, style: 'header' },

      {
        table: {
          headerRows: 1,
          widths: ['auto', '*'],
          body: [
            ['Texto', 'Tipo'],
            ...filas
          ]
        }
      },

      { text:'\nTOTAL DE TAREAS REALIZADAS  '+this.tareas_items_copia.length, style: 'footer' },
    ],
    styles: {
      header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] }
    }
  };

  (pdfMake as any).createPdf(documentDefinition).open();
}



}



