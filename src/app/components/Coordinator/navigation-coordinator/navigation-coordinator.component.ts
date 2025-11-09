import { Component, OnInit } from '@angular/core';
import { delay, Observable } from 'rxjs';
//import {JsonwtService} from 'src/app/services/jsonwt.service';
import { JsonwtService } from 'src/app/services-student/jsonwt.service';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-coordinator',
  templateUrl: './navigation-coordinator.component.html',
  styleUrls: ['./navigation-coordinator.component.css']
})
export class NavigationCoordinatorComponent {
constructor( private jwtservice : JsonwtService, private router: Router){
     
}

ngOnInit(): void {


  }



  toogle : boolean =false;

  /*too_menu(){
      
      this.toogle=false;
  }*/
        
  nombre_apellido : string = '';
  

    async clean(){
      const value=this.jwtservice.Clean;
       
      
       if(value.value == true)
       {

        this.router.navigate(['admin/createuser']);
           await delay(1000);
           window.location.reload();
             
       }     
      
    }

}
