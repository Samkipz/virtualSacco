import { useState } from "react"
import styles from "./fileUpload.module.css"

const FileUpload = () => {
    const [file, setFile] = useState();
    const [fileEnter, setFileEnter] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setFileEnter(true);
    }

    const handleDragLeave = (e) => {
        e.preventDefault();
        setFileEnter(false);
    }

    const handleDragEnd = (e) => {
        e.preventDefault();
        setFileEnter(false);
    }

    const handleOnDrop = (e) => {
      e.preventDefault();
      setFileEnter(false)

      if(e.dataTransfer.items){
        [...e.dataTransfer.items].forEach((item, i) => {
          if(item.kind === "file"){
            const file = item.getAsFile();
            if (file) {
              let blobUrl =URL.createObjectURL(file);
              setFile(blobUrl);
            }
            console.log(`items file[${i}].name = ${file?.name}`);
          }
          else{
            [...e.dataTransfer.files].forEach((file, i) =>{
              console.log(`...file[${i}].name = ${file.name}`);
            });
          }
        })
      }
    }

    const handleFileChange = (e) => {
      e.preventDefault();
      console.log(e.target.files);
      let files = e.target.files;

      if(files && files[0]){
        let blobUrl = URL.createObjectURL(files[0]);
        setFile(blobUrl)
      }
    }



    return (
        <div className={styles.container}>
          {!file ? (
            <div
              onDragOver = {handleDragOver}
              onDragLeave={handleDragLeave}
              onDragEnd={handleDragEnd}
              
              onDrop={handleOnDrop}
              
              className={`${fileEnter ? styles.bgBorder : styles.smBorder } ${styles.fileUploadArea}`}
            >
              <label htmlFor="file" className={styles.uploadLabel}>
                Click to upload or drag and drop
              </label>
              <input
                id="file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className={styles.upLoadArea}>
              <object
                data={file}
                type="image/png" //need to be updated based on type of file
              />
              <button onClick={() => setFile("")}>
                Reset
              </button>
            </div>
          )}
        </div>
      );
    };

export default FileUpload