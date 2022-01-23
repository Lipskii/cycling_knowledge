import * as Yup from "yup";

export const DBRacesStageValidationSchema = () => Yup.object(
    {
        number: Yup.number()
            .required('Required'),
        date: Yup.date()
            .required('Required'),
        seasonId: Yup.number()
            .required('Required'),
        startCity: Yup.string(),
        finishCity: Yup.string(),
        distance: Yup.number()
    })