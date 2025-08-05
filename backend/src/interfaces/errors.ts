export class NotFoundError extends Error {
    constructor(descriptor: string) {
        const message = `Resource not found: ${descriptor}`;
        super(message);
        this.name = 'NotFound';
    }
}