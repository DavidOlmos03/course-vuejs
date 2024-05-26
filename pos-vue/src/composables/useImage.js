// Composable para subir imagen y regresarnos la URL de la imagen, en firebase
import { ref, computed } from "vue"
import { useFirebaseStorage } from "vuefire"
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { uid } from "uid"

export default function useImage() {


    const url = ref('')
    const storage = useFirebaseStorage()
    const onFileChange = e => {
        // console.log(e.target.files)
        // Obtenemos el archivo
        const file = e.target.files[0]
        // Generamos el nombre unico
        const filename = uid()  + '.jpg'
        // Generamos la referencia con el identificador del storage, y la ubicación del archivo
        const sRef = storageRef(storage, '/products/' + filename)

        // Sube el archivo
        const uploadTask = uploadBytesResumable(sRef, file)
        // el uploadTask recibe y 1 evento y 3 callbacks
        uploadTask.on('state_changed',
            ()=>{},
            (error)=> console.log(error),
            ()=>{
                // La imagen ya se subio (Upload is complete)
                getDownloadURL(uploadTask.snapshot.ref)
                .then(downloadURL => {
                    url.value = downloadURL
                })
            }
        )
    }

    const isImageUploaded = computed(()=>{
        return url.value ? url.value : null
    })


    return {
        url,
        onFileChange,
        isImageUploaded
    }
}