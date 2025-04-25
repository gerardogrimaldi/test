import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { User } from './user.model';
import { HttpStatus } from '@nestjs/common';

@Controller('users')
export class UsersController {
  private users: User[] = [];
  //`GET /users`: Retrieve a list of all users.
  @Get()
  findAll(): User[] | HttpStatus{ // Change return type to any[] to reflect the actual return type
    if (this.users.length === 0) {
      return  HttpStatus.NOT_FOUND; // Return a default user if the list is empty
    }
    return this.users;
  }
  // `GET /users/:id`: Retrieve a user by ID.

  @Get(':id')
  findOne(id: number): User | HttpStatus { // Change return type to User | string
    let user = this.users.find(user => user.id === id);
    return user ? user : HttpStatus.NOT_FOUND; // Return 404 if user not found
  }

  // `POST /users`: Add a new user.
  @Post()
  create(req: any): string { 
    console.log(req); // Log the request body for debugging
    const newUser = req.body;
    if (!newUser.name) {  
      return `User name is required`;
    }
    if (!newUser.email) { 
      return `User email is required`;
    }
    this.users.push(newUser); 
    return `This action adds a new user with ID: ${newUser.id}`;
  }

  // `PUT /users/:id`: Update a user by ID.
  @Put(':id')
  update(id: number, req: any): string {
    
    let user = this.users.find(user => user.id === id);
    if (!user) {  
      return `User not found`;
    }
    
    user = { ...user, ...req.body };
    return `This action updates a user with ID: ${id}`;
  }

  // `DELETE /users/:id`: Delete a user by ID.
  @Delete(':id')
  remove(id: number): string {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {   
      return `User not found`;
    }
    this.users.splice(userIndex, 1);
    return `This action removes a user with ID: ${id}`;
  }
 
}