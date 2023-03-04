import express from "express";
import cors from "cors";
import { locals } from "./mock/locals";
import { LoginSchema } from "./schemas";

const app = express();
const port = 3000;

const local_mocks = locals;
// const employee_mocks = require("../mock/employees");
// const task_mocks = require("..//mock/tasks_specs");
// const tool_mocks = require("../mock/tools");

app.use(cors());

// Configuring body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/login", (req: express.Request, res: express.Response) => {
  try {
    LoginSchema.parse(req.body);
    res.send("OK");
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

app.get("/api/locals", (req: any, res: any) => {
  res.json(local_mocks);
});

// app.get("/api/locals/:id/employees", (req, res) => {
//   const employees = employee_mocks
//     .filter((employee: any) => employee.worksIn === req.params.id)
//     .map(({ id, name }: any) => ({ id, name }));

//   res.json(employees);
// });

// app.get("/api/tasks", (req, res) => {
//   res.json(task_mocks);
// });

// app.get("/api/tools", (req, res) => {
//   res.json(tool_mocks);
// });

// app.get("/api/employees/:id/tasks", (req, res) => {
//   const { id } = req.params;
//   const tasksInEmployee = employee_mocks.find(
//     (employee) => employee.id === id
//   ).tasks;

//   res.json(tasksInEmployee);
// });

// /** Employee with tasks DTO
//  * {
//  *   id: string,
//  *  name: string,
//  *  worksIn: string,
//  *  tasks: [{
//  *  id: string,
//  *  name: string}]
//  *
//  * }
//  */

// app.get("/api/employees/:id/tasks/:taskId", (req, res) => {
//   const { id, taskId } = req.params;
//   const taskIdInEmployee = employee_mocks
//     .find((employee) => employee.id === id)
//     .tasks.find((task) => task.id === taskId);

//   res.json(task_mocks);
// });
// /**
//  * {
//  *  id: string,
//  *  name: string
//  *  tools: [
//  * {
//  *  id: string,
//  * name: string
//  * }
//  * ]
//  *
//  * }
//  *
//  */
// //Edit the complete task
// app.post("/api/tasks/:id", (req, res) => {});

// //Edit the tools in tasks in "memory"
// app.post("/api/tasks/:id/tools", (req, res) => {});

app.listen(port, () =>
  console.log(`Test Mock API Server listening on port ${port}!`)
);
