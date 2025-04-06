interface LoginFormType {
    email: string,
    password: string
}

interface SginUpType extends LoginFormType {
    name: string, 
    passwordConfirmation: string
}