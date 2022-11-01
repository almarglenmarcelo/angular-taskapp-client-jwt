export class CompletedTask {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public datetime_finished?: string,
        public user_id?: number
    ){}
}
