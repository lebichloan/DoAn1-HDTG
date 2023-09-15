import {getDatabase, ref, update} from 'firebase/database';

const UpdateData = async (data, refdb) => {
  const db = getDatabase();
  const updates = {};
  updates[refdb] = data;
  console.log('Update data sucess', refdb);
  return update(ref(db), updates);
};

export default UpdateData;
