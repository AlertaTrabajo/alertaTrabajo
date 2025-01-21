import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './footer.component.html',
  host: { 'data-id': 'footer-unique' }, // Atributo único para resolver colisiones
})
export class FooterComponent {}
