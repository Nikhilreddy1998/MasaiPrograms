"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmailService_1 = require("./src/EmailService");
const TaskService_1 = require("./src/TaskService");
const task = new TaskService_1.TaskService();
const email = new EmailService_1.EmailService();
task.createTask("Learning SRP ");
email.sendEmail("yashmolawade06@gmail.com");
