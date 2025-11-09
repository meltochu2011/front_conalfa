import { Component} from '@angular/core';

import { Category } from 'src/app/models/Category';

import { ProfesorService } from '../../../services-profesor/profesor.service';
//import {WebSocketService} from '../../services/web-socket.service';
import { WebSocketService } from 'src/app/services-student/web-socket.service';
//import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Gallery_element } from 'src/app/models/Gallery_element';
import {environment} from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Task } from 'src/app/models/Task';
//import { JsonwtService } from 'src/app/services/jsonwt.service';
import { JsonwtService } from 'src/app/services-student/jsonwt.service';
import { Task_profesor } from 'src/app/models/Task_profesor';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.css']
})
export class WordsListComponent {


 /**Para cambiar la forma del cursor mientras se carga algo*/
 public loading_gif : any|boolean;


 
  order_info: any =[];
 


 public archivos : any= [];
 selectedOptions =[];

 task: Task_profesor =
 {
   profesor_id:0,
   task_text:'',
   leter_id:0,
   image:'',
   type : ''
 };
 

  
  constructor(/*private readonly sppinerSvc : SppinerService,*/private profesor_service: ProfesorService,private router: Router,private activedRoute: ActivatedRoute, private http: HttpClient,private websocketservice : WebSocketService,private tokenSvc : JsonwtService) { 
    
    //this.websocketservice.connect();    
    this.Socket_config();
  }


  ngOnInit(): void {
    
   
      this.initial_function();
    
      this.get_words();
      
  }

  rolname : string = '';
   initial_function(){
     this.rolname = this.tokenSvc.Rolname_Observable.Rolname;  
 
    //this.orders_quantity();
    //this.getOrders_count(this.global_index_page,environment.pagevalue);
   
    
   }
  

  /*ESTRUCTURA PARA REALIZAR TAREAS TEMPORALES QUE REQUIEREN ALGUNOS CAMBIOS SOBRE LA ESTRUCTURA DE categori_ins*/ 
  category_temporal: Category =
  {
    id_category:0,
    name:'',
    description:'',
    image:'',
    has_image:0
  };

  
  /**ESTRUCTURA OBTENER Y MOSTRAR LOS ELEMENTOS DE LA GALERÍA */
  /* gallery_element: Gallery_element=
  {
    id_gallery:0,
    src_image: ''
  }*/

  gallery: any =[];

   constante=0;
   LIST_DIREC: string ="";

   Selected_state: boolean = true;  


 
  orderdetail_id : number = 0; 
  asign_orderid(orderdetail_id : number){    
    environment.orderdetail_id = orderdetail_id;  
    this.orderdetail_id = orderdetail_id;
    //this.orderdetailcomponent.getOrder_detail(orderdetail_id);
  }

  
  public loading : any|boolean;

  conectarsocket(task_text: String, image: String, letter_id : number, type : String, syllable_word_id : number){

     this.task.profesor_id = parseInt(this.tokenSvc.TokenObservable.Token)
    this.task.task_text = task_text;
    this.task.leter_id = letter_id;
    this.task.image = image;
    this.task.type = type;
    this.task.syllable_word_id = syllable_word_id;
 console.log("ESTO INSERTA ", this.task);

    
  /**PONER EL CURSOR EN MODO ESPERA */
  document.body.style.cursor = 'wait';
  this.loading= true;

    this.profesor_service.asign_task(this.task)
    .subscribe(
       res =>{
  
        
         document.body.style.cursor = 'default';
         this.loading= false;         
        this.websocketservice.emitEvent("intern");
        this.task_asign_alert(); 
       },
       err => console.log(err)
      
    )

 
   }


   conectarsocketintern(){
    this.websocketservice.emitEvent("intern");
    //this.order_alert();
   }

   


  global_index_page=0;
  global_quantity=0;
  global_sumatory=0;
  paging_array: any =[];
  array_orders_count: any =[];
  initial_index=0;
  final_index=0;

 

    Socket_config(){

      
          //alert("accede");     
           //this.websocketservice.connect();
          
          this.websocketservice.callback.subscribe(res =>{
    
  
          if(res == "intern")
           {
           this.websocketservice.intern_order_alert(); 
           }

           });

           

    }

 syllable_word_id : number = 0;
     confirmar_disable(syllable_word_id : number){
                    this.syllable_word_id = syllable_word_id;
    
      Swal.fire({
       title: "¿Seguro quiere eliminar las tareas del alfabetizador, las tareas hechas por los alumnos se eliminaran?",
       showDenyButton: true,
       //showCancelButton: true,
       confirmButtonText: "Eliminar tareas del alfabetizador",
       denyButtonText: `Cancelar eliminación de tareas`
     }).then((result) => {
       /* Read more about isConfirmed, isDenied below */
       if (result.isConfirmed) {
         this.disable_lesson();
       } 
     });
     
     
     }      

  disable_lesson(){
 
          this.profesor_service.disablelesson (this.syllable_word_id).subscribe(
   res=> {
     /**CAMBIAMOS LA FORMA DEL CURSOR A MODO DEFECTO*/  
    document.body.style.cursor = 'default';
 
     /*ACA ANTEPONEMOS EL EFECTO DEL CURSOR PORQUE getGallery TAMBIEN TIENE
     EFECTO DE CURSOR*/
 
     Swal.fire(        
       '¡Se ha dado de baja la lección!'
     )
     this.get_words();
   },
   err=> {
       alert("ha surgido un error"+ err);
   }
  )
 
       }



    order_detail_info: any =[];
  /**Para cambiar la forma del cursor mientras se carga algo*/
 public loading_modaldetail_gif : any|boolean;
 

 

 task_asign_alert()
 {
 
   const Toast = Swal.mixin({
     toast: true,
     position: 'top-end',
     showConfirmButton: false,
     timer: 3000,
     timerProgressBar: true,
     didOpen: (toast) => {
       toast.addEventListener('mouseenter', Swal.stopTimer)
       toast.addEventListener('mouseleave', Swal.resumeTimer)
     }
   })
   
   Toast.fire({
     icon: 'success',
     text:"Se ha asignado la tarea"
     
   })
  } 



  
   

  
  word_items: any =[];
  get_words()
  {
   
    this.word_items = [];
    /**PONER EL CURSOR EN MODO ESPERA */
    document.body.style.cursor = 'wait';
    this.loading_modaldetail_gif=true;
    
    this.profesor_service.get_words().subscribe(
     
      res=> { 
        this.word_items=res;     
        this.loading_modaldetail_gif=false;  
        document.body.style.cursor = 'default';
        
           
      },
      err=> {
        
       
        this.loading_modaldetail_gif=false,
        document.body.style.cursor = 'default'
        } 
    );
  }





  refresh(){
    
    window.location.reload();
  }



  /*extraerBase64 = async ($event : any) => new Promise((resolve, reject) =>{
       
         try {
              const unsafeImg= window.URL.createObjectURL($event); 
              const image = this.sanitizer.bypassSecurityTrustHtml(unsafeImg);
              const reader =new FileReader();
              reader.readAsDataURL($event);
              reader.onload = () => {
                     resolve({
                          base: reader.result
                     }
                     );
              };

              reader.onerror= error => {
                resolve({
                   /*blob: $event,
                   image,*/
                 /*  base: null    

                });
              };


         } catch (error) {
           return (error);
         }

   } );*/

      


}
