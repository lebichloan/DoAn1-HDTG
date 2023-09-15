import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {storage} from '../../Firebase/firebase';
import UpdateData from './UpdateData';

const UploadFile = async (imageUri, refStorage, refdb) => {
  try {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log('Upload fail: ', e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', imageUri, true);
      xhr.send(null);
    });
    const storageRef = ref(storage, refStorage);
    const snapshot = await uploadBytes(storageRef, blob);
    console.log('Upload successfully!');
    const url = await getDownloadURL(snapshot.ref);
    console.log('Get URL successfully: ', url);
    UpdateData(url, refdb);
    return url;
  } catch (error) {
    console.log('Upload fail: ', error);
  }
};

export default UploadFile;
