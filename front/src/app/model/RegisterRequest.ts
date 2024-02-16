

export class RegisterRequest {
    password: string;
    email: string;
    username: string;

    constructor(password: string, email: string, username: string) {
        this.password = password;
        this.email = email;
        this.username = username;
    }

}