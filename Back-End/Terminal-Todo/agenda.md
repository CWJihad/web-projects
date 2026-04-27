## 1. Basic command format (VERY IMPORTANT)
```
node filename.js command argument
```
In code:

process.argv[2] → command

process.argv[3] → argument

### 2. Add a task

```
node todo.js add "Learn Node.js"
```
✅ What happens:

command = "add"

arg = "Learn Node.js"

Task is saved in tasks.json

### 3. Show all tasks
```
node app.js show
```
Output example:

1 - Learn Node.js
2 - Practice JavaScript

### 4. Remove a task
```
node app.js remove 1
```
This removes task number 1

You must give the number, not the task text.

## Quick Cheat Sheet
```
node app.js add "Task name"
node app.js show
node app.js remove 2
```