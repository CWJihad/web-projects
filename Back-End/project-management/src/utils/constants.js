// for secure and best practice

export const UserRolesEnum = {
    ADMIN: "admin",
    PROJECT_ADMIN: "project_admin",
    MEMBER: "member"
}

 // now we are just get values of UserRolesEnum's as a array without keys then we can do any array operation
export const AvailableUserRole = Object.values(UserRolesEnum) 

export const TaskStatusEnum = {
    TODO : "todo",
    IN_PROGRESS: "in_progress",
    DONE: "done"
}

// doing this we can get object to array format only values
export const AvailableTaskStatues = Object.values(TaskStatusEnum)