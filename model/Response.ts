export class Response {
    status: boolean
    message: string

    constructor(status: boolean, message: string) {
        this.status = status;
        this.message = message;
    }

}