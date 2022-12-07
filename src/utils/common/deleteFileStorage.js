import { deleteObject, ref } from 'firebase/storage';
import { storage } from '~/firebase/config';

const deleteFileStorage = async (id, success = () => {}, fail = () => {}) => {
    const desertRef = ref(storage, id);
    await deleteObject(desertRef)
        .then(() => {
            success();
        })
        .catch((error) => {
            fail();
            console.log('Error appearing', error);
        });
};

export default deleteFileStorage;
