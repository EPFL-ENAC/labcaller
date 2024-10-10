import * as React from 'react';
import { Create, SimpleForm, TextInput, DateInput, required } from 'react-admin';
import { UppyUploader } from './Uppy';


export const UploadCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" validate={[required()]} />
            <UppyUploader />
            <TextInput source="teaser" multiline={true} label="Short description" />
            {/* <RichTextInput source="body" /> */}
            <DateInput label="Publication date" source="published_at" defaultValue={new Date()} />
        </SimpleForm>
    </Create>
);

export default UploadCreate;