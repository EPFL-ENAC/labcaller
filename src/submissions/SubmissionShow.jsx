import {
    Show,
    SimpleShowLayout,
    TextField,
    DateField,
    ArrayField,
    SingleFieldList,
    Datagrid,
    FunctionField,
} from 'react-admin';


const SubmissionShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="name" />
                <TextField source="description" />
                <DateField
                    label="Submitted at"
                    source="time_added_utc"
                    sortable={false}
                    showTime={true}
                />
                <ArrayField source="inputs" sort={{ field: "filename", order: "ASC" }}>
                    <Datagrid bulkActionButtons={false}>
                        <TextField source="filename" />
                        <FunctionField
                            source="size"
                            render={record => `${(record.size / 1024 / 1024).toFixed(2)} MB`}
                        />
                        <DateField source="modified" showTime />
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout>
        </Show >
    )
};


export default SubmissionShow;