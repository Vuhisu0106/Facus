import classNames from 'classnames/bind';
import { useState } from 'react';
import useResizeFile from '../Hook/useResizeFile';
import { getDownloadURL, ref, uploadBytesResumable, uploadString } from 'firebase/storage';

import styles from './test.module.scss';
import { setDocument } from '~/firebase/services';
import { storage } from '~/firebase/config';

const cx = classNames.bind(styles);
function Test2() {
    const [img, setImg] = useState(null);
    const { resizeFile } = useResizeFile();

    const onClick = async () => {
        const storageRef = ref(storage, '001');
        const uri = await resizeFile(img);

        // await storageRef.putString(img, 'data_url').then((urls) => {
        //     storageRef.getDownloadURL().then((downloadUrls) => {
        //         console.log(downloadUrls);
        //     });
        // });

        await uploadString(storageRef, uri, 'data_url').then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                console.log(downloadURL);
                // await setDocument('testImg', '001', {
                //     img: downloadURL,
                // });
            });
        });
    };

    const onChange = async (e) => {
        const image = await resizeFile(e.target.files[0]);
        //console.log(image.putString(image, 'data_url'));
    };
    return (
        <div className={cx('test2')}>
            <button onClick={onClick}>Click</button>
            <label htmlFor="photo-upload" className={cx('add-photo-wrapper')}>
                <h3>Add photo</h3>
            </label>
            <input id="photo-upload" type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} />
        </div>
    );
}

export default Test2;
