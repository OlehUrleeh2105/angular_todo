import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskCategory, TaskService } from '../services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent {

  editForm: FormGroup;
  taskRef: any;

  categories = Object.values(TaskCategory);

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EditTaskComponent>
  ) {
    this.editForm = this.formBuilder.group({
      title: [this.data.task.title],
      description: [this.data.task.description],
      category: [this.data.task.category],
      deadline: [this.data.task.deadline],
      isDone: [this.data.task.isDone]
    })
  }

  onSubmit() {
    this.taskService.updateTask(this.editForm.value, this.data.task.id).then(() => this.dialogRef.close());
  }
}
