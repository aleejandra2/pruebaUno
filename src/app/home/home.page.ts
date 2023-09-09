import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Usuario } from '../registrar/registrar.page';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  formLogin!: FormGroup;
  usuarios: Usuario[] = [];

  constructor(
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router) {

    this.formLogin = this.formBuilder.group({
      'correo': new FormControl("",Validators.required),
      'contraseña': new FormControl("",Validators.required)
    })
  }

  async login(){
    var form = this.formLogin.value;
    
    const usuarioString = localStorage.getItem('usuarios');

  if (usuarioString) {
    this.usuarios = JSON.parse(usuarioString);

    const usuarioEncontrado = this.usuarios.find(usuario => usuario.correo === form.correo && usuario.contraseña === form.contraseña);

    if (usuarioEncontrado) {
      console.log('ingresar')
    }else{
      const alert = await this.alertController.create({
        header: 'Datos Incorrectos',
        message: 'Tiene que completar todos los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  } else {
    const alert = await this.alertController.create({
      header: 'Usuario no encontrado',
      message: 'El usuario no existe',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
}

resetPass() {
  // Agrega la lógica para restablecer la contraseña si es necesario
  this.router.navigate(['/recuperar']);
}

}
