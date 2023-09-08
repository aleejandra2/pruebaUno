import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';



export interface Usuario {
  nombre: string;
  apellido: string;
  rut: string;
  carrera: string;
  correo: string;
  contraseña: string;
}
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  formRegistro!: FormGroup;
  usuarios: Usuario[] = [];

  constructor(public formBuilder: FormBuilder,private alertController: AlertController) {
    this.formRegistro = this.formBuilder.group({
      'nombre': new FormControl("",Validators.required),
      'apellido': new FormControl("",Validators.required),
      'rut': new FormControl("",Validators.required),
      'carrera': new FormControl("",Validators.required),
      'correo': new FormControl("",Validators.required),
      'contraseña': new FormControl("",Validators.required)
    });
   }

  ngOnInit() {
    const usuariosRegistrados = localStorage.getItem('usuarios');
    if (usuariosRegistrados) {
      this.usuarios = JSON.parse(usuariosRegistrados);
    }
  }


  async registrar(){
    console.log("Guardar")
    var form = this.formRegistro.value;

    if(this.formRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Tiene que completar todos los datos',
        buttons: ['Aceptar'],
      });
  
      await alert.present();
      return;
    }
    var nuevoUsuario: Usuario = {
      nombre: form.nombre,
      apellido: form.apellido,
      rut: form.rut,
      carrera: form.carrera,
      correo: form.correo,
      contraseña: form.contraseña,
    };
    this.usuarios.push(nuevoUsuario);

    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    
   
  }
}
