import { Component} from '@angular/core';

import { Category } from 'src/app/models/Category';
import { Task } from 'src/app/models/Task';

import {Studentservice} from '../../../services-student/student.service';
import {WebSocketService} from '../../../services-student/web-socket.service';
//import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Gallery_element } from 'src/app/models/Gallery_element';
import {environment} from 'src/environments/environment';
import Swal from 'sweetalert2';
import { SpeechRecognitionService } from '../../../services-student/speech-recognition.service';
import { SharingService } from 'src/app/services-student/sharing.service';
import { JsonwtService } from 'src/app/services-student/jsonwt.service';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {


  /**Para cambiar la forma del cursor mientras se carga algo*/
 public loading_gif : any|boolean;


 
  order_info: any =[];
 


 public archivos : any= [];
 selectedOptions =[];

 transcript: string = '';
  
  constructor(/*private readonly sppinerSvc : SppinerService,*/public speechRecognitionService: SpeechRecognitionService,private student_service : Studentservice,private router: Router,private activedRoute: ActivatedRoute, private http: HttpClient,private websocketservice : WebSocketService, private token_svc : JsonwtService) { 
    
    this.websocketservice.connect();    
    this.Socket_config();
    this.speechRecognitionService.onresult = (event: any) => {
      this.transcript = event.results[0][0].transcript;
    };

    

  }

  
   task_ins: Task =
    {
      profesor_id:0,
      student_id: 0,
      text_id: 0,
      type:'',
      syllable_word_id: 0,
    };


  estado_escucha : boolean = false;
  //nextpage_state : boolean = true;
  
     globaltipetext_id : number = 0;
     globlteacher_id : number = 0;
     
   //FUNCION PARA DETENER ESCUCHA DEL MICROFONO
  toggleListening(type_text_id: number,profesor_id : number, type: string, sound_text : String, syllable_word_id : number) {

    console.log("ESTOS VALORES SON LOS QUE SE REGISTRAN "+type_text_id,profesor_id,type, sound_text);

    /*VALORES A INSERTAR EN LAS TABLAS*/
    /*teacher_id*/this.task_ins.profesor_id= profesor_id;
     this.task_ins.type = type;
     this.task_ins.syllable_word_id = syllable_word_id;
    /*id del texto */
    /*type */
  

     

    if (this.speechRecognitionService.isListening) {
      

      
      this.estado_escucha = this.speechRecognitionService.isListening;
      
      this.speechRecognitionService.stopListening();
      this.estado_escucha = false;
       
  
     
      if(sound_text === this.transcript)
        {
          this.registrar_tarea();
          this.sonido_exito();
          this.success_task_alert();
          this.transcript="";

          
        }

        else if(sound_text !== this.transcript)
        {
          
          this.sonido_error();
          this.error_task_alert();
        
          this.transcript="";
         
          
        }
      
    } else {
      //this.transcript='';
     
      this.speechRecognitionService.startListening();
      this.estado_escucha = true; 
    }
  }


  public loading : any|boolean;
  registrar_tarea(){
     
     this.task_ins.student_id=parseInt(this.token_svc.TokenObservable.Token);
     
      //this.task_ins.text_id=2;
     

    console.log("id del profesor"+this.task_ins.profesor_id);
    console.log("id del estudiante "+parseInt(this.token_svc.TokenObservable.Token));
    console.log("texto del "+this.task_ins.text_id);
    console.log("type "+this.task_ins.type);

    
       this.student_service.registrar_tarea(this.task_ins)
     .subscribe(
        res =>{
          

           //this.Save_user_alert();
           //this.registerForm.reset();

        },
        err => console.log(err)
       
     )
 
   }


  ngOnInit(): void {
    
   
      this.initial_function();
      this.get_task();
      
  }

   initial_function(){
   
    environment.pagevalue = 1;

    //this.orders_quantity();
    //this.getOrders_count(this.global_index_page,environment.pagevalue);
   
    
   }
  


  
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

  conectarsocket(){
this.websocketservice.emitEvent("intern");
   
  }


    Socket_config(){
   
          
            this.websocketservice.callback.subscribe(res =>{
      
            if(res=="intern")
             {
             this.estado_escucha=false;
             this.transcript= "";
             this.get_task(); 
             this.websocketservice.intern_order_alert(); 
             }
   
             });
            
       
    }


    task_items: any =[];
get_task()
{
 
  this.task_items = [];
  /**PONER EL CURSOR EN MODO ESPERA */
  document.body.style.cursor = 'wait';
  this.loading_modaldetail_gif=true;
  
  this.student_service.get_task().subscribe(
   
    res=> { 
      this.task_items=res;     
      this.loading_modaldetail_gif=false;  
      document.body.style.cursor = 'default';
   
    },
    err=> {
      
      this.loading_modaldetail_gif=false,
      document.body.style.cursor = 'default'
      } 
  );
}


   
  /**Para cambiar la forma del cursor mientras se carga algo*/
 public loading_modaldetail_gif : any|boolean;
  


  


  public loading_statebuton :boolean = false;
  

  /**INICIALIZAMOS nextpage_state y previus_state con true porque si
   * lo inicializamos con false se genera un bug en el lado del front
   * en los botones siguiente y anterior
   */
  nextpage_state : boolean = true;
  previus_state : boolean = true;


 

  refresh(){
    
    window.location.reload();
  }


   userphone : string | any = '';


   success_task_alert()
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


     error_task_alert()
   {
       Swal.fire({
       icon: "error",
       title: "Oops...",
       text: "No es correcto",
       footer: '<a href="#">repetir lección!</a>'
        });

    } 


  
sonido_exito(){
  
 const music = new Audio('assets/sounds/sonido_exito.mp3');
 
 setTimeout(function(){      
 music.load();
 music.play();

 },1000);

 }

sonido_error(){
  
  const music = new Audio('assets/sounds/SD_ERROR.mp3');
 
 setTimeout(function(){      
 music.load();
 music.play();

 },1000);
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
