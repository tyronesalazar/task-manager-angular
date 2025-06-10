import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name = '';
  email = '';
  password = '';
  showPassword = false;
  missingEmail = false;
  typeInputPassword = 'password';
  mensaje = '';

  constructor(private authService: AuthService) {}

  changeStateEye() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) this.typeInputPassword = 'text';
    else this.typeInputPassword = 'password';
  }

  verifyForm() {
    if (this.name.length == 0) return (this.mensaje = 'Escriba su nombre.');
    if (this.email.length == 0) return (this.mensaje = 'Escriba un email.');
    const passwordMsg = this.validatePassword();
    if (passwordMsg.validated) {
      this.register();
    } else {
      return (this.mensaje = passwordMsg.reason);
    }
    return 0;
  }

  validatePassword() {
    const answer = {
      validated: false,
      reason: '',
    };

    if (this.password.length < 8) {
      answer.reason = 'La contraseña debe tener al menos 8 carácteres.';
      return answer;
    }
    answer.validated = true;
    return answer;
  }

  register() {
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (res) => {
        alert(res.mensaje);
      },
      error: (err) => {
        this.mensaje = err.error.mensaje;
      },
    });
  }
}
