import { useState } from "react";
import styles from "./fileUpload.module.css";

const FileUpload = ({ onFileUpload }) => {
    const [file, setFile] = useState();
    const [fileEnter, setFileEnter] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setFileEnter(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setFileEnter(false);
    };

    const handleDragEnd = (e) => {
        e.preventDefault();
        setFileEnter(false);
    };

    const handleOnDrop = (e) => {
        e.preventDefault();
        setFileEnter(false);

        if (e.dataTransfer.items) {
            [...e.dataTransfer.items].forEach((item, i) => {
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    if (file) {
                        let blobUrl = URL.createObjectURL(file);
                        setFile(blobUrl);
                        onFileUpload(file); // Pass the file to the parent component
                    }
                    console.log(`items file[${i}].name = ${file?.name}`);
                } else {
                    [...e.dataTransfer.files].forEach((file, i) => {
                        console.log(`...file[${i}].name = ${file.name}`);
                    });
                }
            });
        }
    };

    const handleFileChange = (e) => {
        e.preventDefault();
        let files = e.target.files;

        if (files && files[0]) {
            let blobUrl = URL.createObjectURL(files[0]);
            setFile(blobUrl);
            onFileUpload(files[0]); // Pass the file to the parent component
        }
    };

    return (
        <div className={styles.container}>
            {!file ? (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDragEnd={handleDragEnd}
                    onDrop={handleOnDrop}
                    className={`${fileEnter ? styles.bgBorder : styles.smBorder} ${styles.fileUploadArea}`}
                >
                    <label htmlFor="file" className={styles.uploadLabel}>
                        Click here to upload or drag and drop
                    </label>
                    <input
                        id="file"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        required
                    />
                </div>
            ) : (
                <div className={styles.upLoadArea}>
                    <object
                        data={file}
                        type="image/png" // Update based on file type
                    />
                    <span onClick={() => setFile("")}>Reset</span>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
