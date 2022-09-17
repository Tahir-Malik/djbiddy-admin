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
    }
];