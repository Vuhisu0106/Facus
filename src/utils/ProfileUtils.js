import { getDownloadURL, ref, uploadBytesResumable, uploadString } from 'firebase/storage';
import { storage } from '~/firebase/config';
import { updateDocument } from '~/firebase/services';
import resizeFiles from './common/resizeFiles';

export const setAvatarFunction = async (currentUser, avatar) => {
    const { resizeFile } = resizeFiles();

    const date = new Date().getTime();
    const storageRef = ref(storage, `${'photoURL' + currentUser.uid + date}`);
    const uri = await resizeFile(avatar);

    await uploadString(storageRef, uri, 'data_url').then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
            await updateDocument('users', currentUser.uid, {
                photoURL: downloadURL,
            });
        });
    });
};

export const setCoverPhotoFunction = async (currentUser, coverPhoto) => {
    const date = new Date().getTime();
    const storageRef = ref(storage, `${'coverPhotoURL' + currentUser.uid + date}`);

    await uploadBytesResumable(storageRef, coverPhoto).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
            await updateDocument('users', currentUser.uid, {
                coverPhotoURL: downloadURL,
            });
        });
    });
};
