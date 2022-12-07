import classNames from 'classnames/bind';
import { useState } from 'react';

import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';

import styles from './test.module.scss';
import { storage } from '~/firebase/config';
import { resizeFiles } from '~/utils';

const cx = classNames.bind(styles);
function Test2() {
    const [img, setImg] = useState(null);
    const { resizeFile } = resizeFiles();

    const onClick = async () => {
        const storageRef = ref(storage, '002');
        const uri = await resizeFile(img);

        await uploadString(storageRef, uri, 'data_url').then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                console.log(downloadURL);
                // await setDocument('testImg', '001', {
                //     img: downloadURL,
                // });
            });
        });
    };

    const onClickDelete = async () => {
        const desertRef = ref(storage, '002');
        deleteObject(desertRef)
            .then(() => {
                console.log('delete image complete');
            })
            .catch((error) => {
                console.log('error appearing');
            });
    };

    return (
        <div className={cx('test2')}>
            <button onClick={onClickDelete}>Click</button>
            <label htmlFor="photo-upload" className={cx('add-photo-wrapper')}>
                <h3>Add photo</h3>
            </label>
            <input id="photo-upload" type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} />
        </div>
    );
}

export default Test2;
