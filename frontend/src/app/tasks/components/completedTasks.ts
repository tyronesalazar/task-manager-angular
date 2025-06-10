import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Prioridad, TaskInterface } from '../../services/tasks.service';

@Component({
  selector: 'app-completed-tasks',
  template: `
    <div class="space-y-3">
      @for (task of completedTasks; track task.id) {
      <div
        class="backdrop-blur-sm bg-white/60 border-0 shadow-lg opacity-75 rounded-lg"
      >
        <div class="p-6 flex justify-between">
          <div class="flex items-start space-x-4 flex-1">
            <button
              (click)="incompleteTask(task)"
              class="mt-1 text-green-500 hover:text-green-600 transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2l4 -4m5 2a9 9 0 1 1-18 0a9 9 0 0 1 18 0z"
                />
              </svg>
            </button>
            <div>
              <h3 class="font-semibold text-gray-600 line-through mb-2">
                {{ task.titulo }}
              </h3>
              <div class="flex items-center space-x-4 text-sm">
                <span
                  class="px-2 py-1 rounded-full text-xs font-medium border {{
                    priorityColors[task.prioridad]
                  }}"
                >
                  {{ priorityEmojis[task.prioridad] }} {{ task.prioridad }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex space-x-2 ml-4">
            <button
              class="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
      }
    </div>
  `,
  styles: [``],
})
export class CompletedTasks {
  @Input() completedTasks: TaskInterface[] = [];
  @Output() taskIncompleted = new EventEmitter();
  priorityColors = {
    alta: 'bg-red-100 text-red-800 border-red-200',
    media: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    baja: 'bg-green-100 text-green-800 border-green-200',
    '': 'bg-gray-100 text-gray-800 border-gray-200',
  };
  priorityEmojis: Record<Prioridad, string> = {
    alta: '🔴',
    media: '🟡',
    baja: '🟢',
    '': '',
  };
  constructor() {}
  incompleteTask(task: TaskInterface): void {
    this.taskIncompleted.emit(task);
    task.estado = 'pendiente';
  }
}
