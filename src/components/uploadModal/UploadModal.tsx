import React, { useEffect, useState } from 'react';
import { uploadEmployeeData } from '../../services/employee';
import { ACCEPT_EMPLOYEE_FILE_TYPE, MAX_EMPLOYEE_FILE_SIZE, SERVERIP } from '../../setting/const';
import { returnFileSize } from '../../util/util';
import './UploadModal.scss';

const UploadModal = ({ onUploadCallback }: { onUploadCallback: () => void }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>();
    const [isFileInvalid, setIsFileInvalid] = useState(false);
    const [serverResponse, setServerResponse] = useState('');
    useEffect(() => {
        if (selectedFile?.type !== ACCEPT_EMPLOYEE_FILE_TYPE) {
            setIsFileInvalid(true);
        } else if (selectedFile && selectedFile.size > MAX_EMPLOYEE_FILE_SIZE) {
            setIsFileInvalid(true)
        } else {
            setIsFileInvalid(false)
        }
    }, [selectedFile])
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('e', e.target);
        const target = e.target as HTMLInputElement;
        const file = target && target.files && target.files[0];
        console.log(file);
        setSelectedFile(file);
    };

    const handleSubmission = async () => {
        const formData = new FormData();
        formData.append('File', selectedFile!);
        const { status, data } = await uploadEmployeeData(formData);
        if (status === 'ok') {

        } else {
            console.log('data', data);
            setServerResponse(data);
        }
    };
    return <div className="upload-modal-container">
        <h3 className='modal-title'>
            Upload Employee Data
        </h3>

        {!serverResponse && <div className='modal-content'>
            <label htmlFor="fileinput">Choose csv file to upload, (file size {'<'} 2MB) </label>

            <input type="file" name="file" accept={ACCEPT_EMPLOYEE_FILE_TYPE} onChange={changeHandler} />
            {selectedFile ? (
                <div className='file-info'>
                    <p>File name: <b>{selectedFile.name}</b></p>
                    <p className={selectedFile?.type !== ACCEPT_EMPLOYEE_FILE_TYPE ? 'file-error-block' : ''}>
                        File Type: <b>{selectedFile.type}</b></p>
                    <p className={selectedFile && selectedFile.size > MAX_EMPLOYEE_FILE_SIZE ? 'file-error-block' : ''}>
                        File size: <b>{returnFileSize(selectedFile.size)}</b></p>
                    <p>
                        FilelastModified:{' '}
                        <b>{new Date(selectedFile.lastModified).toLocaleString()}</b>
                    </p>
                </div>
            ) : (
                <p>Select a file to show details</p>
            )}
            {isFileInvalid && selectedFile &&
                <div className='file-error-block'>
                    Invalid file is selected, file must be csv and less than 2MB.
                </div>}
            {!isFileInvalid && selectedFile &&
                <div className='file-valid-block'>
                    Great! Your file is valid, click 'submit' to upload.
                </div>}

        </div>}

        {serverResponse && <>{serverResponse}</>}
        <div className='modal-footer'>
            <button onClick={() => { onUploadCallback() }}>Cancel</button>
            <button disabled={!selectedFile || isFileInvalid} onClick={handleSubmission}>Submit</button>
        </div>

    </div >
}
export default UploadModal;