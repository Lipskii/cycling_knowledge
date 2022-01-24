import * as Yup from "yup";

const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];

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
        dateOfBirth: Yup.date()
            .required('Required'),
        file: Yup.mixed()
            .required("A file is required")
            // .test(
            //     "fileSize",
            //     "File too large",
            //     value => value && value.size <= FILE_SIZE
            // )
            .test(
                "fileFormat",
                "Unsupported Format",
                value => value && SUPPORTED_FORMATS.includes(value.type)
            )
//,
        //     code: Yup.string()
        //         .test('len', 'Must be exactly 3 characters', val => val.length === 3)
        //         .required('Required'),
    })