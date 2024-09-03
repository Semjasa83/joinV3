import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Task } from '../../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private API_URL =  `${environment.apiUrl}/api/`;

  private tasks = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasks.asObservable();

  private taskIdSubject = new BehaviorSubject<string>('');
  taskId$: Observable<string> = this.taskIdSubject.asObservable();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  public async getAllTasks()  {
    return lastValueFrom(this.http.get<Task[]>(this.API_URL + 'tasks')).then((data: any) => {  this.tasks.next(data['tasks']) });
  };

  public async testCall() {                                                                         //remember to remove this function
    return this.http.get<Task[]>(this.API_URL + 'tasks', { observe: 'response' }).subscribe(res => {
      console.log('response Status', res.status);
      console.log('body', res.body);
    });
  }

  public async getTask(id: string) {
    return lastValueFrom(this.http.get<Task>(this.API_URL + `tasks/${id}`));
  };

  public async updateTask(id: string, task: Task) {
    return firstValueFrom(this.http.put<Task>(this.API_URL + `tasks/${id}`, task, this.httpOptions));
  };

  public async deleteTask(id: string) {
    return lastValueFrom(this.http.delete<Task>(this.API_URL + `tasks/${id}`));
  };

  public async addTask(task: Task) {
    return lastValueFrom(this.http.post<Task>(this.API_URL + 'tasks', task, this.httpOptions)).then((data: any) => {  window.location.reload() });
  };

  public setTaskId(id: string): void {
    this.taskIdSubject.next(id);
  }

  public getTaskId(): Observable<string> {
    return this.taskId$;
  }
}
