import { Component} from '@angular/core';

import { Category } from 'src/app/models/Category';

import { ProfesorService } from 'src/app/services-profesor/profesor.service';

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
  selector: 'app-phraseslist',
  templateUrl: './phraseslist.component.html',
  styleUrls: ['./phraseslist.component.css']
})
export class PhraseslistComponent {


/**Para cambiar la forma del cursor mientras se carga algo*/
public loading_gif : any|boolean;


 
order_info: any =[];



public archivos : any= [];
selectedOptions =[];


constructor(/*private readonly sppinerSvc : SppinerService,*/private profesorservice: ProfesorService  ,private router: Router,private activedRoute: ActivatedRoute, private http: HttpClient,private websocketservice : WebSocketService, private jwt: JsonwtService) { 
  
  //this.websocketservice.connect();    
  this.Socket_config();
}


rolname : string = '';
ngOnInit(): void {
  
 
    this.initial_function();
  
    this.get_phrases();
    
}

 initial_function(){
 
   this.rolname = this.jwt.Rolname_Observable.Rolname;  
  //this.orders_quantity();
  //this.getOrders_count(this.global_index_page,environment.pagevalue);
 
  
 }


/*ESTRUCTURA PARA REALIZAR TAREAS TEMPORALES QUE REQUIEREN ALGUNOS CAMBIOS SOBRE LA ESTRUCTURA DE categori_ins*/ 
task: Task_profesor =
{
  profesor_id: 0,
  task_text:'',
  leter_id:0,
  image:'',
  type : ''
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
 

task_text : string = "hola mundo";
id_profesor: Number = 0;



orderdetail_id : number = 0; 
asign_orderid(orderdetail_id : number){    
  environment.orderdetail_id = orderdetail_id;  
  this.orderdetail_id = orderdetail_id;
  //this.orderdetailcomponent.getOrder_detail(orderdetail_id);
}


public loading : any|boolean;
conectarsocket(task_text: String, image: String, letter_id : number, type : String , syllable_word_id : number){
  //this.websocketservice.emitEvent("delivery");
    this.task.profesor_id = parseInt(this.jwt.TokenObservable.Token)
    this.task.task_text = task_text;
    this.task.leter_id = letter_id;
    this.task.image = image;
    this.task.type = type;
    this.task.syllable_word_id = syllable_word_id;

 console.log("ESTO INSERTA ", this.task);
  /**PONER EL CURSOR EN MODO ESPERA */
  document.body.style.cursor = 'wait';
  this.loading= true;

    this.profesorservice.asign_task(this.task)
    .subscribe(
       res =>{
         
         /**PNER EL CURSOR POR DEFECTO */
         document.body.style.cursor = 'default';
         this.loading= false;
         this.websocketservice.emitEvent("intern");
    
       },
       err => console.log(err)
      
    )


    
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


 
          this.profesorservice.disablelesson (this.syllable_word_id).subscribe(
   res=> {
     /**CAMBIAMOS LA FORMA DEL CURSOR A MODO DEFECTO*/  
    document.body.style.cursor = 'default';
 
     /*ACA ANTEPONEMOS EL EFECTO DEL CURSOR PORQUE getGallery TAMBIEN TIENE
     EFECTO DE CURSOR*/
 
     Swal.fire(        
       '¡Se ha dado de baja la lección!'
     )
     this.get_phrases();
   },
   err=> {
       alert("ha surgido un error"+ err);
   }
  )
 
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


  Socket_config(){

    if(environment.Socket_state == 0)
    {
        //alert("accede");     
         //this.websocketservice.connect();
        
        this.websocketservice.callback.subscribe(res =>{
  
        if(res == "intern")
         {
         this.websocketservice.intern_order_alert(); 
         }

         });

         this.websocketservice.orderresponse.subscribe(res =>{
  
         
          if(res == true)
          {
             alert("hola");
          }

          if(res == false)
          {
             alert("error");
          }
          });          
         environment.Socket_state = 1;

    }


    else if(environment.Socket_state > 0){
      /*console.log("aqui entra");
      alert("es mayor que 0 socket state");*/
      //this.websocketservice.delivery_order_alert(); 

 
      this.websocketservice.callback.subscribe(res =>{
  
        if(res == 'delivery')
       {
         
        //this.websocketservice.delivery_order_alert();    
       }
      // this.websocketservice.orderresponse.subscribe(res =>{
  
         
      /*  if(res == true)
        {
           alert("hola");
        }

        if(res == false)
        {
           alert("error");
        }*/
       // });          

});
      /*this.orders_quantity();
      this.getOrders_count(this.global_index_page,environment.pagevalue);
      this.websocketservice.delivery_order_alert();*/ 
      //this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=> this.router.navigate(["/dishes/orders_list"]));            
    }

  }


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





phrase_items: any =[];
get_phrases()
{
 
  this.phrase_items = [];
  /**PONER EL CURSOR EN MODO ESPERA */
  document.body.style.cursor = 'wait';
  this.loading_modaldetail_gif=true;
  //this.global_index_page=index_begining;
  this.no_results = false;
  //cantidad = this.global_category_count[0].count;
  //cantidad = this.global_category_count[0].count;*/
  //console.log("dato "+this.cantidad);
  this.profesorservice.get_phrases().subscribe(
   
    res=> { 
      this.phrase_items=res;     
      this.loading_modaldetail_gif=false;  
      document.body.style.cursor = 'default';
      console.log(this.phrase_items);      
    },
    err=> {
      
      this.no_results=true,
      this.loading_modaldetail_gif=false,
      document.body.style.cursor = 'default'
      } 
  );
}



/**INICIALIZAMOS nextpage_state y previus_state con true porque si
 * lo inicializamos con false se genera un bug en el lado del front
 * en los botones siguiente y anterior
 */
nextpage_state : boolean = true;
previus_state : boolean = true;


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
