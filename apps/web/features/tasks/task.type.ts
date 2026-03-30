
import { IUser, Priority, Status } from "../shared/types/type";

export interface IFormData {
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    dueDate: Date | string;
    assignees: IUser[];
    reporter: IUser | null
}
