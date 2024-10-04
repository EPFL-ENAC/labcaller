import {
    Edit,
    SimpleForm,
    TextInput,
} from 'react-admin';

const SubmissionEdit = () => {
    return (
        <Edit redirect="show">
            <SimpleForm>
                <TextInput source="id" disabled />
                <TextInput source="name" />
                <TextInput source="description" />
            </SimpleForm>
        </Edit>
    )
};

export default SubmissionEdit;
