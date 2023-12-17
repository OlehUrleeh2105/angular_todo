import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { TaskCategory, TaskService, TheTask } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: TheTask[] | undefined = [];
  selectedCategories: string[] = [];
  categories = Object.values(TaskCategory);

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {},
        } as TheTask;
      }).filter(task => {
        return this.selectedCategories.length === 0 || this.selectedCategories.includes(task.category);
      }).sort((a, b) => {
        if (a.isDone !== b.isDone) {
          return a.isDone ? 1 : -1;
        }
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      })
    });
  }

  onDelete(taskId: string) {
    this.taskService.deleteTask(taskId);
  }

  onToggle(taskId: string) {
    const task = this.tasks?.find(task => task.id === taskId);
    if (task) {
      this.taskService.updateTask(task, taskId);
    }
  }

  openEditModal(task: any) {
    this.dialog.open(EditTaskComponent, {
      data: {
        task: task
      }
    });
  }

  onCategoryChange() {
    this.loadTasks();
  }
}
