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

export const UppyUploader = () => {
    const auth = useAuthProvider();
    const token = auth.getToken();
    const refresh = useRefresh();
    const notify = useNotify();
    const pondRef = useRef(null);
    // const instructionText = `
    //     The filename will be used to interpret the layer properties
    //     and must be in the format of
    //     {crop}_{watermodel}_{climatemodel}_{scenario}_{variable}_{year}.tif
    //     (eg. rice_pcr-globwb_miroc5_rcp60_rg_2080) or {crop}_{crop-specific-variable}.tif.
    //     If the layer already exists it will be deleted and readded with the new file.
    // `;
    const headers = {
        authorization: `Bearer ${token}`,
    };

    // const [uppy] = useState(() => new Uppy({
    //     // restrictions: {
    //     // allowedFileTypes: ['.tif']
    //     // }
    // }).use(XHR, {
    //     endpoint: '/api/uploads',
    //     headers: headers,
    //     limit: 25,
    //     onAfterResponse: (response) => {
    //         console.log('onAfterResponse', response);
    //         const parsedResponse = JSON.parse(response.response);

    //         if (response.status === 200) {
    //             notify('File uploaded successfully');
    //             refresh();
    //         } else {
    //             console.log("Response", parsedResponse);
    //             notify(`Error uploading file: ${parsedResponse.detail.message}`);
    //         }
    //     }
    // }));

    const [uppy] = useState(() => new Uppy({
        // restrictions: {
        // allowedFileTypes: ['.tif']
        // }
    }).use(Tus, {
        endpoint: 'http://labcaller:88/files',
        headers: headers,
    }));
    return (
        <>
            <DragDrop id="dragdrop" uppy={uppy}
            // note={instructionText}
            />
            <StatusBar id="statusbar" uppy={uppy} />
        </>
    );
};
