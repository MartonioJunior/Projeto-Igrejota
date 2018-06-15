import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { AuthService } from '../auth.service';
import { TopbarComponent } from '../topbar/topbar.component';
import { MessageService } from '../message.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  enviado: boolean = false;
  loaded: boolean = false;
  login: string;
  loginValido: boolean;
  senha: string;
  senhaValida: boolean;

  constructor(
    public auth: AuthService,
    public router: Router,
    private messageService: MessageService
    ) {

  }

  ngOnInit() {
    this.watch(this)
  }

  watch(self: LoginComponent) {
    if (self.auth.loggedIn()) {
      self.login = self.auth.getLoggedUser()
      self.loaded = true
    } else {
      let timer = setTimeout(self.watch, 1000, self);
    }
  }

  entrar() {
  	this.enviado = true;
  	this.auth.login(this.login,this.senha)
      .subscribe(login => login ? this.enter() : this.clear());
  }

  enter() {
    this.router.navigate([this.router.url]);
    this.messageService.clear();
  }

  clear() {
    this.login = "";
    this.senha = "";
  }

  mudarSenha() {
    this.auth.changePassword(this.login)
  }

}
