import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateCategory',
  standalone: true
})
export class TranslateCategoryPipe implements PipeTransform {
  private translations: { [key: string]: string } = {
    vacation_leave: 'Vacaciones',
    labor_rights: 'Derechos Laborales',
    health_safety: 'Seguridad y Salud',
    laws_regulations: 'Leyes y Regulaciones',
    practical_advice: 'Consejos Prácticos',
    others: 'Otros'
  };

  transform(value: string): string {
    return this.translations[value] || 'Categoría Desconocida';
  }
}
