import {
    Show,
    SimpleShowLayout,
    TextField,
    BooleanField,
    DateField,
} from 'react-admin';


const SubmissionShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="comment" />
                <BooleanField source="processing_has_started" />
                <BooleanField source="processing_success" />
                <DateField
                    label="Created on (UTC)"
                    source="created_on"
                    sortable={false}
                    showTime={true}
                />
                <DateField
                    label="Last updated (UTC)"
                    source="last_updated"
                    sortable={false}
                    showTime={true}
                />
            </SimpleShowLayout>
        </Show >
    )
};
export default SubmissionShow;