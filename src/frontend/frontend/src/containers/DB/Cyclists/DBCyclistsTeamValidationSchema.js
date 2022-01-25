import * as Yup from 'yup'

export const DBCyclistsTeamValidationSchema = () => Yup.object(
    {
        seasonId: Yup.number()
            .required('Required'),
        teamId: Yup.number()
            .required('Required'),
//,
        //     code: Yup.string()
        //         .test('len', 'Must be exactly 3 characters', val => val.length === 3)
        //         .required('Required'),
    })