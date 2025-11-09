import { Component} from '@angular/core';

import { Category } from 'src/app/models/Category';
import { Task_profesor} from 'src/app/models/Task_profesor';

import {WebSocketService} from '../../../services-student/web-socket.service';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {environment} from 'src/environments/environment';
import Swal from 'sweetalert2';

import { ProfesorService } from '../../../services-profesor/profesor.service';



@Component({
  
  selector: 'app-vocals-list',
  templateUrl: './vocals-list.component.html',
  styleUrls: ['./vocals-list.component.css']
})


export class vocalsListComponent {

 /**Para cambiar la forma del cursor mientras se carga algo*/
 public loading_gif : any|boolean;


 
  order_info: any =[];
 


 public archivos : any= [];
 selectedOptions =[];
 task: Task_profesor =
 {
 
   task_text:'',
   leter_id:0,
   image:'',
   type : '',
   sound_text: ''
 };
 
  
  constructor(/*private readonly sppinerSvc : SppinerService,*/private profesorservice : ProfesorService,private router: Router,private activedRoute: ActivatedRoute, private http: HttpClient,private websocketservice : WebSocketService) { 
    
    //this.websocketservice.connect();    
    this.Socket_config();
  }


  ngOnInit(): void {
    
   
      this.initial_function();
    
      this.get_vowels();
      
  }

   initial_function(){
   
    environment.pagevalue = 1;
    this.global_index_page = 0;
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




  public loading : any|boolean;

  conectarsocket(task_text: String, image: String, letter_id : number, type : String ,sound_text : String){

    //type_text_id ?: String,
    //profesor_id?: String,
    //task_text?: String,
    //leter_id?:number,
    //image?: String,
    //type?: String,
    //sound_text?: String
    /*this.task.type_text_id = "1";
    this.task.profesor_id = "1";*/
    this.task.task_text=task_text;
    this.task.leter_id = letter_id;
    this.task.image=image;
    this.task.type=type;
    this.task.sound_text= sound_text;
   
    console.log(this.task.sound_text);
  /**PONER EL CURSOR EN MODO ESPERA */
  document.body.style.cursor = 'wait';
  this.loading= true;

    this.profesorservice.asign_task(this.task)
    .subscribe(
       () =>{
         
      
         /**PNER EL CURSOR POR DEFECTO */
         document.body.style.cursor = 'default';
         this.loading= false;         
        this.websocketservice.emitEvent("intern");
        
       }
     
      
    )


 
   }

   

   no_results : boolean = false;


  global_index_page=0;
  global_quantity=0;
  global_sumatory=0;
  paging_array: any =[];
  array_orders_count: any =[];
  initial_index=0;
  final_index=0;
 
 

    Socket_config(){

          
          this.websocketservice.callback.subscribe(res =>{
    
          if(res == "intern")
           {
           this.websocketservice.intern_order_alert(); 
           }

           });

    

    }


    order_detail_info: any =[];
  /**Para cambiar la forma del cursor mientras se carga algo*/
 public loading_modaldetail_gif : any|boolean;



  order_detail: any =[];
  //public loading_modaldetail_gif : any|boolean;
  

  
  


  public loading_statebuton :boolean = false;
  
 

 Update_orderstate_alert(res : JSON | any)
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
     title: res
   })
  } 
  
 vowel_items: any =[];
  get_vowels()
  {
   
    this.vowel_items = [];
    /**PONER EL CURSOR EN MODO ESPERA */
    document.body.style.cursor = 'wait';
    this.loading_modaldetail_gif=true;
    //this.global_index_page=index_begining;
    this.no_results = false;
    //cantidad = this.global_category_count[0].count;
    //cantidad = this.global_category_count[0].count;*/
    //console.log("dato "+this.cantidad);
    this.profesorservice.get_vowels().subscribe(
     
      ( res: any)=> { 
        this.vowel_items=res;     
        this.loading_modaldetail_gif=false;  
        document.body.style.cursor = 'default';
        console.log(this.vowel_items);      
      },
      ()=> {
        
        this.no_results=true,
        this.loading_modaldetail_gif=false,
        document.body.style.cursor = 'default'
        } 
    );
  }



  error_updating_state()
  {
    Swal.fire({
      icon: 'error',
      title: 'Lo sentimos...',
      text: 'No se completo la actualizacion!',
      footer: '<a >Notifique error</a>'
    })            

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
