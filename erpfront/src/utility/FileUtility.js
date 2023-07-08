const FileUtility = {
    convertToBase64: file => {
        return new Promise((resolve, reject) => {
            console.warn(file)
            if (file === null) {
                resolve(null)
            }

            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();
      
            // Convert the file to base64 text
            reader.readAsDataURL(file);
      
            // on reader load somthing...
            reader.onload = () => {
              baseURL = reader.result;
              resolve(baseURL);
            };

            reader.onerror = () => {
                reject(reader.error)
            }
        });
    }
}

export default FileUtility