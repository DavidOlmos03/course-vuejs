import { ref } from 'vue';

export default function useLocationMap(){
    const zoom = ref(13)
    const center = ref([6.2471018,-75.5874061])

    return {
        zoom,
        center
    }
}