import * as Yup from "yup";

export const DBRacesStageResultsValidationSchema = () => Yup.object(
    {
        rank: Yup.number()
            .required('Required'),
        time: Yup.number()
            .required('Required'),
//,
        //     code: Yup.string()
        //         .test('len', 'Must be exactly 3 characters', val => val.length === 3)
        //         .required('Required'),
    })