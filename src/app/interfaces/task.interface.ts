import { Contact } from "./contact.interface";

export interface Task {
    title: string | null;
    description: string | null;
    dueDate: Date | null | string;
    priority: string | null;
    category: string | null;
    subTasks: string[] | null;
    contacts: string[] | null;
    _id: null | string;
}

export class TaskImpl implements Task {
    constructor(
        public title: string = '',
        public description: string = '',
        public dueDate: Date = new Date(),
        public priority: string = '',
        public category: string = '',
        public subTasks: string[] = [],
        public contacts: string[] = [],
        public _id: string = '',
    ) {}
}