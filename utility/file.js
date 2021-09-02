const fs = require('fs');

// this will accept a file for deletion
const deleteFile = (filePath) => {
    // unlink will delete a file - pass in the err callback
    fs.unlink(filePath, (err) => {
        // if there is an error - the error should bubble up and our default express handler will handle it.
        if (err) {
            throw (err);
        }
    });
}

exports.deleteFile = deleteFile;