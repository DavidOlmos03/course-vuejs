
<script setup>
    const items = [1,2,3,4,5]
</script>
<template>
    <h2 class="text-center text-h3 my-5 font-weight-bold">Nueva Propiedad</h2>
    <v-card max-width="800"  class="mx-auto">

        <v-card-title
            class = "text-h4 font-weight-bold pb-0"
            tag = "h3"

        >
           Nueva Propiedad
        </v-card-title>
        <v-card-subtitle
            class="text-h5"
        >
            Crea una nueva propiedad llenando el siguiente formulario
        </v-card-subtitle>
        <v-form class="mt-10 px-5">
            <v-text-field 
                class="mb-5"
                bg-color="blue-grey-lighten-5"
                label="Titulo propiedad"
            />
            <v-file-input 
                class="mb-5"
                bg-color="blue-grey-lighten-5"
                label="Fotografia"
                prepend-icon="mdi-camera"
                accept="image/jpeg"
            />
            <v-text-field 
                class="mb-5"
                bg-color="blue-grey-lighten-5"
                label="Precio"
            />
            <v-row>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select
                    label="Habitaciones"
                    class="mb-5"
                    bg-color="blue-grey-lighten-5"
                    :items="items"
                    />
                </v-col>
            
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select
                    label="WC"
                    class="mb-5"
                    bg-color="blue-grey-lighten-5"
                    :items="items"
                    />
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select
                    label="Lugares de Estacionamiento"
                    class="mb-5"
                    bg-color="blue-grey-lighten-5"
                    :items="items"
                    />
                </v-col>
                <v-col cols="12"
                md="6"
                >
                    <v-textarea class="mb-5" label="Descripción"></v-textarea>
                </v-col>
                <v-col cols="12"
                md="6"
                >
                <v-checkbox label="Alberca"/>
            </v-col>
        </v-row>
        <v-btn
            class="mb-5"
            color="pink-accent-3"
            block
        >Agregar Propiedad</v-btn>
        </v-form>
    </v-card>

</template>