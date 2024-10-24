import React, { useRef, useState } from 'react';
import {
    useAuthProvider,
    useNotify,
    useRefresh,
} from 'react-admin';

import Uppy from '@uppy/core';
import { DragDrop, ProgressBar, StatusBar } from '@uppy/react';
import XHR from '@uppy/xhr-upload';
import '@uppy/core/dist/style.min.css';
import '@uppy/drag-drop/dist/style.min.css';
import '@uppy/status-bar/dist/style.min.css';
import './UppyUploader.css'; // Import custom CSS
import Tus from '@uppy/tus';
import { Grid } from '@mui/material';

export const UppyUploader = ({ submission_id }) => {
    const auth = useAuthProvider();
    const token = auth.getToken();
    const refresh = useRefresh();
    const notify = useNotify();
    const pondRef = useRef(null);
    if (!submission_id) {
        notify("No submission ID provided");
        return null;
    }
    const headers = {
        authorization: `Bearer ${token}`,
        SubmissionId: submission_id,
    };
    const [uppy] = useState(() => new Uppy(
        {}).use(Tus, {
            endpoint: '/files',
            headers: headers,
        })
    );

    return (
        <Grid container justifyContent="center">
            <Grid item>
                <DragDrop id="dragdrop" uppy={uppy} />
                <StatusBar id="statusbar" uppy={uppy} />
            </Grid>
        </Grid>
    );
};
