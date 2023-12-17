import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  userID: string | null = '';

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {
    this.authService.getCurrentUserUID().then(uid => this.userID = uid);
  }

  addTask(task: TheTask) {
    return this.authService.getCurrentUserUID().then(userId => {
      if (userId) {
        task.userID = userId;
        task.isDone = false;
        return this.firestore.collection('tasks').add(task);
      } else {
        throw new Error('User not authenticated');
      }
    });
  }

  getTasks() {
    return this.firestore
      .collection('tasks', ref => ref.where('userID', '==', this.userID))
      .snapshotChanges();
  }

  getTask(id: string) {
    return this.firestore
      .collection('tasks')
      .doc(id)
      .snapshotChanges();
  }

  updateTask(task: TheTask, id: string) {
    return this.firestore
      .collection('tasks')
      .doc(id)
      .update({
        title: task.title,
        description: task.description,
        category: task.category,
        deadline: task.deadline,
        isDone: task.isDone,
      })
  }

  deleteTask(taskId: string) {
    return this.firestore
      .collection('tasks')
      .doc(taskId)
      .delete()
  }
}

export interface TheTask {
  id: string
  title: string,
  description: string,
  category: string,
  deadline: Date,
  isDone: boolean,
  userID: string
}

export const TaskCategory = ['Work', 'Personal', 'Study', 'Health', 'Other']
