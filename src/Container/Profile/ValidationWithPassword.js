export default [
    {
        field: 'name',
        validations: ['required'],
        name: 'Name'
    },
    {
        field: 'email',
        validations: ['required', 'email'],
        name: 'Email'
    },
    {
        field: 'gender',
        validations: ['required', 'gender'],
        name: 'Gender'
    },
    {
        field: 'password',
        validations: ['required', 'password'],
        name: 'Password'
    },
    {
        field: 'confirmpassword',
        validations: ['confirm'],
        name: 'Confirm password'
    }
];