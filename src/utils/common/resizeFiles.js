import Resizer from 'react-image-file-resizer';

function resizeFiles() {
    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                1000,
                1000,
                'JPEG',
                50,
                0,
                (uri) => {
                    resolve(uri);
                },
                'base64',
            );
        });

    return { resizeFile };
}

export default resizeFiles;
