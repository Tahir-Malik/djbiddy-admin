export default [
    {
        field: 'fullName',
        validations: ['required'],
        name: 'fullName'
    },
    {
        field: 'username',
        validations: ['required'],
        name: 'username'
    },
    {
        field: 'email',
        validations: ['required', 'email'],
        name: 'email'
    },
    {
        field: 'mobileNo',
        validations: ['required'],
        name: 'mobileNo'
    },

];