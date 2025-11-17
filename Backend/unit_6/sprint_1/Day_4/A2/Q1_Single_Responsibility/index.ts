import { EmailService } from "./src/EmailService";
import { TaskService } from "./src/TaskService";

// A class should have only one reason to change
const task = new TaskService()
const email = new EmailService()

task.createTask("Learning SRP ")
email.sendEmail("yashmolawade06@gmail.com")