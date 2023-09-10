import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QRPage implements OnInit {
  title = 'qr-reader';
  public cameras:MediaDeviceInfo[]=[];
  public myDevice!: MediaDeviceInfo;
  public scannerEnabled=false;
  public results:string[]=[];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  camerasFoundHandler(cameras: MediaDeviceInfo[]){
    this.cameras=cameras;
    this.selectCamera(this.cameras[0].label);
  }

  scanSuccessHandler(event: string) {
    console.log(event);
    this.results.unshift(event);
    this.checkAndNavigate(); 
  }

  selectCamera(cameraLabel: string){    
    this.cameras.forEach(camera=>{
      if(camera.label.includes(cameraLabel)){
        this.myDevice=camera;
        console.log(camera.label);
        this.scannerEnabled=true;
      }
    })    
  }
  private checkAndNavigate() {
    if (this.results.length > 0) {
      const result = this.results[0]; 
      console.log(result);
      this.router.navigate(['/clase-registrada'], { queryParams: { resultado: result } });
      
    }}

}
