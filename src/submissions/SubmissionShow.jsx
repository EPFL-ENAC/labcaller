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
    useUnselectAll,
    Button,
    useListContext,
    useDeleteMany,
    TabbedShowLayout,
    FunctionField,
} from 'react-admin';
import { Grid, Box, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { FilePondUploader } from '../uploads/FilePond';
import { useEffect } from "react";

const UploadData = () => {
    const record = useRecordContext();

    return (
        <>
            <Box mt={2} mb={2}>
                <FilePondUploader submission_id={record.id} />
            </Box>
        </>
    );
};
const DeleteObjectButton = () => {
    const record = useRecordContext();

    const notify = useNotify();
    const refresh = useRefresh();

    const [deleteOne] = useDelete(
        'uploads',
        { id: record.id, previousData: record }
    );

    if (!record) return null;

    return <IconButton
        color="error"
        sx={{ padding: 0, minWidth: 'auto' }}
        onClick={
            (event) => {
                event.stopPropagation();
                deleteOne().then(() => {
                    notify("File deleted");
                    setTimeout(() => {
                        refresh();
                    }, 500);
                }).catch((error) => {
                    notify("Error: File not deleted");
                    console.error(error);
                });
            }
        }
    >
        <DeleteOutlineIcon />
    </IconButton >;

};
const CustomBulkDeleteButton = () => {
    const { selectedIds } = useListContext(); // Get selected IDs from the list context
    const notify = useNotify();
    const refresh = useRefresh();
    const [deleteMany] = useDeleteMany();
    const unselectAll = useUnselectAll('submissions');
    useEffect(() => {
        return () =>
            unselectAll();
    }, []
    );


    const handleBulkDelete = () => {
        deleteMany('uploads', { ids: selectedIds })
            .then(() => {
                notify("Files deleted");
                unselectAll();
                setTimeout(() => {
                    refresh();
                }, 500);
            })
            .catch((error) => {
                notify("Error: Some files were not deleted");
                console.error(error);
            });
    };


    return (
        <Button color="error" onClick={handleBulkDelete}>
            Delete Selected
        </Button>
    );
};

// Update bulk action buttons to use the custom bulk delete button
const AssociationBulkActionButtons = () => (
    <>
        <CustomBulkDeleteButton />
    </>
);

const Tabs = () => {
    const record = useRecordContext();
    const createPath = useCreatePath();
    const handleRowClick = (id, resource, record) => (
        createPath({ resource: 'uploads', type: 'show', id: record.id })
    );
    if (!record) return null;
    const totalBytes = record.associations?.reduce((acc, cur) => acc + cur.size_bytes, 0);
    console.log(totalBytes);
    return (
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label={`Inputs (${record.associations?.length ? record.associations.length : 0} files: ${(totalBytes / 1024 / 1024 / 1024).toFixed(2)} GB)`}>
                <ArrayField source="associations" label="File inputs" >
                    <Datagrid bulkActionButtons={<AssociationBulkActionButtons />} rowClick={handleRowClick} size="small"
                    >
                        <DateField
                            source="created_on"
                            label="Added"
                            sortable={false}
                            showTime
                            transform={value => new Date(value + 'Z')}  // Fix UTC time
                        />
                        <TextField source="filename" label="Filename" />
                        <FunctionField render={record => (record.size_bytes / 1024 / 1024 / 1024).toFixed(2) + " GB"} label="Size" />
                        <BooleanField source="all_parts_received" label="Upload complete" />
                        <TextField source="processing_message" label="Status" />
                        <DeleteObjectButton />
                    </Datagrid>
                </ArrayField>
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    )

}

const SubmissionShow = () => {

    return (
        <Show>
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
                <Tabs />
            </SimpleShowLayout>
        </Show>
    )
};
export default SubmissionShow;