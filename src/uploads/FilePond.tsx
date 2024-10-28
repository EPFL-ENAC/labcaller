import {
    useRecordContext,
    Loading,
    useAuthProvider,
    useRefresh,
} from 'react-admin';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import * as tus from 'tus-js-client';
import React from 'react';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

registerPlugin(FilePondPluginFileValidateType);


export const FilePondUploader = ({ submission_id }) => {
    const auth = useAuthProvider();
    if (!auth) return <Loading />;

    const token = auth.getToken();
    const refresh = useRefresh();
    const record = useRecordContext();

    if (!record) return <Loading />;

    return (
        <FilePond
            acceptedFileTypes={[
                'application/octet-stream'
            ]}
            allowFileTypeValidation={true}
            fileValidateTypeDetectType={(source, type) => new Promise((resolve, reject) => {
                if (source.name.toLowerCase().endsWith('.pod5')) {
                    resolve('application/octet-stream');
                }

            })}
            chunkUploads={true}
            onprocessfiles={refresh}
            allowMultiple={true}
            credits={false}
            allowRevert={false}
            allowRemove={false}
            server={{
                process: (fieldName, file, metadata, load, error, progress, abort) => {
                    const filetype = (filename) => {
                        if (filename.toLowerCase().endsWith('.pod5')) {
                            return 'application/octet-stream';
                        } else {
                            return null;
                        }
                    };
                    var upload = new tus.Upload(file, {
                        endpoint: "/files",
                        retryDelays: [0, 1000, 3000, 5000],
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'SubmissionId': submission_id,
                        },
                        metadata: {
                            filename: file.name,
                            filetype: filetype(file.name)
                        },
                        onError: function (err) {
                            console.log("Failed because: " + err)
                        },
                        onProgress: function (bytesUploaded, bytesTotal) {
                            progress(true, bytesUploaded, bytesTotal)
                        },
                        onSuccess: function () {
                            load(upload.url.split('/').pop())
                            refresh();
                        }
                    })
                    // Start the upload
                    upload.start()
                    return {
                        abort: () => {
                            upload.abort()
                            abort()
                        }
                    }
                }
            }}
        />)
}

export default FilePondUploader;