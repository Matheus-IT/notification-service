export class Content {
    private readonly contentValue: string;

    constructor(value: string) {
        const isContentValid = this.validateContent(value);
        
        if (! isContentValid) {
            throw new Error('Content length error');
        }
        
        this.contentValue = value;
    }

    validateContent(value: string): boolean {
        return value.length >= 5 && value.length <= 240;
    }

    get value(): string {
        return this.contentValue;
    }
}