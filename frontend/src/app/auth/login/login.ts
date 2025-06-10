import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  showPassword = false;
  missingEmail = false;
  typeInputPassword = 'password';
  mensaje = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token && !this.isTokenExpired(token)) {
      this.router.navigate(['/tasks']);
    }
  }
  changeStateEye() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) this.typeInputPassword = 'text';
    else this.typeInputPassword = 'password';
  }

  verifyForm() {
    console.log(this.email);
    if (this.email.length == 0) return (this.missingEmail = true);
    else this.missingEmail = false;
    console.log(this.password.length);
    if (this.password.length == 0)
      return (this.mensaje = 'La contraseña es requerida');
    else this.mensaje = '';
    this.logear();
    return;
  }

  logear() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        alert('Login exitoso');
        window.location.href = '/tasks';
      },
      error: (err) => {
        this.mensaje = err.error.mensaje;
      },
    });
  }

  redirect() {
    window.location.href = '/register';
  }
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch (e) {
      return true;
    }
  }
}
