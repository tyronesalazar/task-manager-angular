import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-tasks',
  template: `
    <div class="space-y-4 animate-pulse">
      <div class="h-6 bg-gray-200 rounded w-1/2"></div>
      <div class="h-4 bg-gray-200 rounded w-full"></div>
      <div class="h-4 bg-gray-200 rounded w-5/6"></div>
      <div class="h-4 bg-gray-200 rounded w-full"></div>
      <div class="h-4 bg-gray-200 rounded w-5/6"></div>
      <div class="h-4 bg-gray-200 rounded w-full"></div>
      <div class="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  `,
  styles: [``],
})
export class SekeletonLoadTasks {
  constructor() {}

  ngOnInit(): void {}
}
