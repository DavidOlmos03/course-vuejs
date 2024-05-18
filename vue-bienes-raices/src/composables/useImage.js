import {ref as storageRef} from 'firebase/storage'
import { useFirebaseStorage,useStorageFile } from 'vuefire'
import { uid } from 'uid'
export default function useImage(){
    const storage = useFirebaseStorage()
    const storageRefPath = storageRef(storage,`/propiedades/${uid()}`)


    const {
        url,
        // uploadProgress,
        // uploadError,
        // uploadTask,
        upload
    } = useStorageFile(storageRefPath)

    function uploadImage(e){
        const data = e.target.files[0]
        if(data){
            upload(data)
        }
    }
    return {
        uploadImage
    }
}