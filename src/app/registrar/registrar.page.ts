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

  // Esto es lo de las escuelas hay algo que le falta 
  // porque las opciones de las carreras no sale
  // realmente no se como le tienes con los "nombres" puesto a cada cosa
  
  carrera: string = '';
  escuela: string = '';
  opcionesCarrera: string[] = [];

  constructor(public formBuilder: FormBuilder,private alertController: AlertController) {
    this.formRegistro = this.formBuilder.group({
      'nombre': new FormControl("",Validators.required),
      'apellido': new FormControl("",Validators.required),
      'rut': new FormControl("",Validators.required),
      'carrera': new FormControl("",Validators.required),
      'correo': new FormControl("",[Validators.required, Validators.email]),
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



  //Esto es lo de la escuela
  onEscuelaChange() {
    // Esta función se ejecuta cuando cambia la selección de escuela
    // Aquí puedes definir las opciones de carrera según la elección de la escuela
    if (this.escuela === 'Administracion y Negocio') {
      this.opcionesCarrera = [
        'Administracion de Empresas',
        'Auditoria',
        'Comercio Exterior',
        'Contabilidad Tributaria',
      ];
    } else if (this.escuela === 'Comunicacion') {
      this.opcionesCarrera = [
        'Actuación',
        'Animación Digital',
        'Comunicación Audiovisual',
        'Ingeniera en Sonido',
        'Técnico Audiovisual',
        'Ingeniería en Sonido',
      ];
    } 
    // else if (this.escuela === 'Gatronomia') {
    //   this.opcionesCarrera = [
    //     'Gatronomia',
    //     'Gatronomia Internacional',
    //   ];
    // } 
    else if (this.escuela === 'Informatica y Telecomunicaciones') {
      this.opcionesCarrera = [
        'Analista Programador',
        'Desarrollo de Aplicaciones',
        'Ingeniera en Informatica',
        'Ingenieria en Infraestructura Tecnológicas',
      ];
    }
    // else if (this.escuela === 'Salud') {
    //   this.opcionesCarrera = [
    //     'Informatica Biomedica',
    //     'Tecnico en Enfermeria',
    //     'Tecnico en Quimica y Farmacia',
    //   ];
    // }else if (this.escuela === 'Turismo y Hoteleria') {
    //   this.opcionesCarrera = [
    //     'Aministración Hotelera',
    //     'Ecoturismo',
    //     'Turismo y Hoteleria',
    //   ];
    // }
    else {
      this.opcionesCarrera = []; // Reinicia las opciones de carrera si no se ha seleccionado una escuela válida
    }
  }
}
