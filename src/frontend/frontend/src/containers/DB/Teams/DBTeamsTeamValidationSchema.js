import * as Yup from 'yup'

export const DBTeamsTeamValidationSchema = () => Yup.object(
    {
        name: Yup.string()
            .required('Required'),
        countryId: Yup.number()
            .required('Required'),
        division: Yup.number()
            .required('Required'),
        code: Yup.string()
            .test('len', 'Must be exactly 3 characters', val => val.length === 3)
            .required('Required'),
    })