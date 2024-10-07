import {
    List,
    Datagrid,
    TextField,
    BooleanField,
    DateField,
} from "react-admin";

const SubmissionList = () => {

    return (
        <List disableSyncWithLocation
            perPage={25}
            sort={{ field: 'time_added_utc', order: 'DESC' }}
        >
            <Datagrid rowClick="show" >
                <TextField source="name" />
                <TextField source="comment" />
                <BooleanField source="processing_has_started" />
                <BooleanField source="processing_success" />
                <DateField
                    label="Created on (UTC)"
                    source="created_on"
                    // sortable={false}
                    showTime={true}
                />
                <DateField
                    label="Last updated (UTC)"
                    source="last_updated"
                    // sortable={false}
                    showTime={true}
                />
            </Datagrid>
        </List >

    )
};

export default SubmissionList;
