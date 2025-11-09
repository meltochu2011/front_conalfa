import { Component} from '@angular/core';

import { Category } from 'src/app/models/Category';

//import {DishService} from '../../../services-student/student.service';
import { ProfesorService } from '../../../services-profesor/profesor.service';
import {WebSocketService} from '../../../services-student/web-socket.service';
//import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Gallery_element } from 'src/app/models/Gallery_element';
import {environment} from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-vocals-list',
  templateUrl: './vocals-list.component.html',
  styleUrls: ['./vocals-list.component.css'],
   standalone: true,
  imports: [CommonModule],
})


export class vocalsListComponent {

 /**Para cambiar la forma del cursor mientras se carga algo*/
 public loading_gif : any|boolean;


 
  order_info: any =[];
 


 public archivos : any= [];
 selectedOptions =[];

  
  constructor(/*private readonly sppinerSvc : SppinerService,*/private profesorservice: ProfesorService, private router: Router,private activedRoute: ActivatedRoute, private http: HttpClient,private websocketservice : WebSocketService) { 
    
    //this.websocketservice.connect();    
    this.get_vowels();
  }


  ngOnInit(): void {
    
   
      this.initial_function();
      
  }

   initial_function(){
   
    environment.pagevalue = 1;
    this.global_index_page = 0;
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

   example : any =
   {
      "customer_name": "David",
      "customer_last_name": "Web",
      "phone": "40196841",
      "address": "Zona 24",
      "has_whatsapp": true,
      "total": 75,
      "note": "Hola mundo, este es el comentario",
      "products": [
          {
              "id_product": 2,
              "amount": 4,
              "sub_total": 80,
              "add_ons": [
                  {
                      "tag": "Ensalada de lechuga",
                      "price":0.25
                  }
              ]
          },
          {
              "id_product": 2,
              "amount": 5,
              "sub_total": 50,
              "add_ons": [
        
              ]
          },
          {
              "id_product": 2,
              "amount": 5,
              "sub_total": 100,
              "add_ons": [
                  {
                      "tag": "Salsa dulce",
                      "price": 0.50
                  },
                  {
                      "tag": "Salsa picamas",
                      "price": 0.50
                  }
              ]
          }
      ]
  }
; 


 
  orderdetail_id : number = 0; 
  asign_orderid(orderdetail_id : number){    
    environment.orderdetail_id = orderdetail_id;  
    this.orderdetail_id = orderdetail_id;
    //this.orderdetailcomponent.getOrder_detail(orderdetail_id);
  }

  conectarsocket(){
    //this.websocketservice.emitEvent("delivery");
      this.websocketservice.emitDataEvent(this.example);
      
   }

   conectarsocketintern(){
    this.websocketservice.emitEvent("intern");
    //this.order_alert();
   }


   
  

   no_results : boolean = false;
  
  global_index_page=0;
  global_quantity=0;
  global_sumatory=0;
  paging_array: any =[];
  array_orders_count: any =[];
  initial_index=0;
  final_index=0;

 
    
 


 
 


    order_detail_info: any =[];
  /**Para cambiar la forma del cursor mientras se carga algo*/
 public loading_modaldetail_gif : any|boolean;
 


  order_detail: any =[];
  //public loading_modaldetail_gif : any|boolean;
 
  
  orderitems_detail: any =[];
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


  
 
  
  

  /**INICIALIZAMOS nextpage_state y previus_state con true porque si
   * lo inicializamos con false se genera un bug en el lado del front
   * en los botones siguiente y anterior
   */
  nextpage_state : boolean = true;
  previus_state : boolean = true;

  verify_previusandnextpage(element_position : number){

    if(this.paging_array.length == 1 ){
      this.nextpage_state = false;
      this.previus_state = false;
  }

  if(this.paging_array.length > element_position ){
    
    this.nextpage_state = true;
   
  }

  if(this.paging_array.length == element_position ){
    
    this.nextpage_state = false;

  }

  if( element_position > 1){
    
    this.previus_state = true;            
  }

  if( element_position == 1){
    
    this.previus_state = false;  
          
  }
  
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
      res=> { 
        console.log(res);
        this.vowel_items=res;     
        this.loading_modaldetail_gif=false;  
        document.body.style.cursor = 'default';
        console.log(this.vowel_items);      
      },
      err=> {
        
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


   userphone : string | any = '';


  async choose_option_call(userphone : string){
     
    this.userphone= userphone;
    
    Swal.fire({
      title: '<strong>Notificar al cliente</strong>',
      //icon: 'info',
      html:
       
        '<a href="https:////wa.me/+502'+this.userphone+'/?text=hola, hemos recibido su pedido, le mantendremos al pendiente por su orden" target="_blank">' +
        '<button name="button" class="btn btn-primary btn-block" style="background: #25d366; border-color: transparent" ><i class="fa fa-whatsapp"></i> Notificar orden recibida</button>'+
        '</a> ' +
        '<br> ' +
        
        '<a href="https:////wa.me/+502'+this.userphone+'/?text=hola, su pedido llegará en 15 minutos" target="_blank">' +
        '<button name="button" class="btn btn-primary btn-block" style="background: #25d366; border-color: transparent" ><i class="fa fa-whatsapp"></i> Notificar llegada en 15 min</button>'+
        '</a> ' +
        '<br> ' +

        '<a href="https:////wa.me/+502'+this.userphone+'/?text=hola, su pedido llegará en 20 minutos" target="_blank">' +
        '<button name="button" class="btn btn-primary btn-block" style="background: #25d366; border-color: transparent" ><i class="fa fa-whatsapp"></i> Notificar llegada en 20 min</button>'+
        '</a> '+
        '<br> '+
        
        '<a href="https:////wa.me/+502'+this.userphone+'/?text=hola, su pedido llegará en 30 minutos" target="_blank">' +
        '<button name="button" class="btn btn-primary btn-block" style="background: #25d366; border-color: transparent" ><i class="fa fa-whatsapp"></i> Notificar llegada en 30 min</button>'+
        '</a> '+
        '<br> '+
        
        '<a href="tel:+502'+this.userphone+'" target="_blank">' +
        '<button name="button" class="btn btn-primary btn-block"> Llamada normal </button>'+
        '</a> '+
        '<br> '
        //<a href="tel: + Signo más + número de prefijo del país + número de teléfono">Anchor text</a>
        ,
        
      showCloseButton: true,
      //showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText:
        'Salir',
      /*confirmButtonColor: '#3085d6',
      confirmButtonAriaLabel: 'recibida',*/
      /*cancelButtonText:
        'Cancelar',*/
      cancelButtonAriaLabel: 'Thumbs down'
    })
    
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
