import { useState } from 'react';


function FileUploader() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData,
            }).then(response => response.json())
            .then(data => {
                console.log(data.data);
            });
        } else {
            console.log('No file selected');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default FileUploader;