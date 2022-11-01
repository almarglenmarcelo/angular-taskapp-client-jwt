import { User } from "./user";

export class Task {
        
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public user_id?: number
    ) {}
}
