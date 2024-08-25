import { Contact } from "./contact.interface";

export interface Task {
    title: string;
    description: string;
    dueDate: Date;
    priority: string;
    category: string;
    subTasks: string[];
    contacts: Contact[];
    _id: string;
}

export class TaskImpl implements Task {
    constructor(
        public title: string = '',
        public description: string = '',
        public dueDate: Date = new Date(),
        public priority: string = '',
        public category: string = '',
        public subTasks: string[] = [],
        public contacts: Contact[] = [],
        public _id: string = '',
    ) {}
}