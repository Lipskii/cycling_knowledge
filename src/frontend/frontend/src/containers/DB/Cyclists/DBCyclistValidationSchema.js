import * as Yup from "yup";

export const DBCyclistsValidationSchema = () => Yup.object(
    {
        firstName: Yup.string()
            .required('Required'),
        lastName: Yup.string()
            .required('Required'),
        countryId: Yup.number()
            .required('Required'),
        genderId: Yup.number()
            .required('Required'),
        date: Yup.date()
            .required('Required'),
//,
        //     code: Yup.string()
        //         .test('len', 'Must be exactly 3 characters', val => val.length === 3)
        //         .required('Required'),
    })