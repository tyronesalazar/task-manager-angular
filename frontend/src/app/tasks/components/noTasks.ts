import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-noTasks',
  template: `<div
    class="backdrop-blur-sm bg-white/80 border-0 shadow-lg rounded-lg"
  >
    <div class="p-12 text-center">
      <div
        class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <svg class="w-8 h-8 text-gray-400">
          <path d="M9 12l2 2 4-4" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">
        No tienes tareas aún
      </h3>
      <p class="text-gray-600 mb-6">
        Comienza creando tu primera tarea para organizar tu trabajo
      </p>
      <button
        (click)="openDialog()"
        class="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 px-4 py-2"
      >
        <svg
          class="w-5 h-5 inline-block mr-2"
          fill="none"
          stroke="currentColor"
        >
          <path d="M12 4v16m8-8H4" />
        </svg>
        Crear primera tarea
      </button>
    </div>
  </div>`,
  styles: [``],
})
export class NoTasks {
  @Input() accion!: () => void;
  constructor() {}
  openDialog(): void {
    this.accion();
  }
}
