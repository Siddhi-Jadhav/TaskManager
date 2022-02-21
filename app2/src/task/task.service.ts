import { UserEntity } from './../user/user.entity';
import { TaskRepository } from './task.repository';
import { SearchTaskDTO } from './dto/search.task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create.task.dto';
import { TaskStatus } from './task.model';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class TaskService {
  constructor(
    //add the dependency for task repository
    //we can inject the TaskRepository into the TaskService using the @InjectRepository() decorator
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(searchTaskDto: SearchTaskDTO, user: UserEntity) {
    return this.taskRepository.getTasks(searchTaskDto, user);
  }

  //create a new task
  async createTask(createTaskDto: CreateTaskDTO, user: UserEntity) {
    //get a new row created for the task
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async getTaskById(id: string) {
    //select * from Task where id = {id}
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException('TASK NOT FOUND');
    }
    return task;
  }
  async updateTaskStatus(id: string, status: TaskStatus) {
    //find the task by id
    const task = await this.getTaskById(id);
    //update the status
    task.status = status;

    //save the changes
    await task.save();

    return task;
  }

  async deleteTask(id: string) {
    //try deleting the task with id
    const result = await this.taskRepository.delete(id);

    //if affected rows are > 0 ---> success
    if (result.affected == 0) {
      throw new NotFoundException('Task not found');
    }

    return result;
  }
}
