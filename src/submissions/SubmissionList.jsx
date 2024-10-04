import {
    List,
    Datagrid,
    TextField,
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
                <TextField source="description" />
                <DateField
                    label="Submitted at"
                    source="time_added_utc"
                    showTime={true}
                />
            </Datagrid>
        </List >

    )
};

export default SubmissionList;
