import {
    Show,
    SimpleShowLayout,
    TextField,
    BooleanField,
    DateField,
    useRecordContext,
    Labeled,
    ArrayField,
    Datagrid,
    useCreatePath,
    useNotify,
    useDelete,
    useRefresh,
} from 'react-admin';
import { UppyUploader } from '../uploads/Uppy';
import { Grid, Box, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const UploadData = () => {
    const record = useRecordContext();

    return (
        <>
            <Box mt={2} mb={2}>
                <UppyUploader submission_id={record.id} />
            </Box>
        </>
    );
};
const CreateSubmissionButton = () => {
    const record = useRecordContext();
    if (!record) return null;

    const notify = useNotify();
    const refresh = useRefresh();

    const [deleteOne, { isPending, error }] = useDelete(
        'uploads',
        { id: record.id, previousData: record }
    );

    return <IconButton
        color="error"
        onClick={
            (event) => {
                deleteOne().then(() => {
                    notify("File deleted");
                    refresh();
                    event.stopPropagation();
                }).catch((error) => {
                    notify("Error: File not deleted");
                });
            }
        }
    >
        <DeleteOutlineIcon />
    </IconButton >;

};

const SubmissionShow = () => {
    const createPath = useCreatePath();
    const handleRowClick = (id, resource, record) => (
        createPath({ resource: 'uploads', type: 'show', id: record.id })
    );

    return (
        <Show>f
            <SimpleShowLayout>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <Labeled label="ID">
                                    <TextField source="id" />
                                </Labeled>
                            </Grid>
                            <Grid item xs={12}>
                                <Labeled label="Name">
                                    <TextField source="name" />
                                </Labeled>
                            </Grid>
                            <Grid item xs={12}>
                                <Labeled label="Comment">
                                    <TextField source="comment" />
                                </Labeled>
                            </Grid>
                            <Grid item xs={12}>
                                <Labeled label="Processing Has Started">
                                    <BooleanField source="processing_has_started" />
                                </Labeled>
                            </Grid>
                            <Grid item xs={12}>
                                <Labeled label="Processing Success">
                                    <BooleanField source="processing_success" />
                                </Labeled>
                            </Grid>
                            <Grid item xs={12}>
                                <Labeled label="Created on">
                                    <DateField
                                        source="created_on"
                                        sortable={false}
                                        showTime={true}
                                        transform={value => new Date(value + 'Z')}  // Fix UTC time
                                    />
                                </Labeled>
                            </Grid>
                            <Grid item xs={12}>
                                <Labeled label="Last updated">
                                    <DateField
                                        source="last_updated"
                                        sortable={false}
                                        showTime={true}
                                        transform={value => new Date(value + 'Z')}  // Fix UTC time

                                    />
                                </Labeled>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <UploadData />
                    </Grid>
                </Grid>
                <ArrayField source="associations" label="File Outputs" >
                    <Datagrid bulkActionButtons={false} rowClick={handleRowClick}
                    >
                        <TextField source="filename" label="Filename" />
                        <DateField
                            source="created_on"
                            label="Added"
                            sortable={false}
                            showTime
                            transform={value => new Date(value + 'Z')}  // Fix UTC time
                        />
                        <CreateSubmissionButton />
                    </Datagrid>
                </ArrayField>

            </SimpleShowLayout>
        </Show>
    )
};
export default SubmissionShow;