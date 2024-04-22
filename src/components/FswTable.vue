<script setup lang="ts">
import { ref } from 'vue'
import fswDialogAcept from './fswDialogAcept.vue'
import fswDialogAdd from './fswDialogAdd.vue'
import fswDialogFile from './fswDialogFile.vue'
import { useCityStore } from '../store/cities'
import { storeToRefs } from "pinia";

const dialogAdd = ref(false)
const dialogDelete = ref(false)
const dialogUpload = ref(false)
const search = ref("")

const cityStore = useCityStore()
const { cities, city } =  storeToRefs(cityStore)

const headers = [
	{ title: 'Ciudad', align: 'start', key: 'cityName' },
	{ title: 'Pais', key: 'country' },
	{ title: 'Num. visitantes', key: 'numVisits' },
	{ title: 'Num. Habitantes', key: 'population' },
	{ title: 'Num. Hoteles', key: 'numHotels' },
	{ title: 'Certificaciones', key: 'certifications' },
	{ title: 'Actions', key: 'actions', sortable: false },
]

const formTitle = 'City Form'

const closeModal = () => {
	cityStore.resetCity()
	dialogAdd.value = false
}

const editItem = (item: any) => {
	cityStore.currentCity(item.cityId)
	dialogAdd.value = true
}

const deleteItem = (item: any) => {
	cityStore.currentCity(item.cityId)
	dialogDelete.value = true
}

const closeDelete = () => {
	cityStore.resetCity()
	dialogDelete.value = false
}

const deleteItemConfirm = () => {
	const idx = city.value.cityId || 0;
	cityStore.dispatchDeleteCity(idx)
	closeDelete()
}

const handleConfirmDelete = (result: boolean) => {
	if (result) deleteItemConfirm();
	closeDelete();
}

const filterCities = (value: string, search: string) => {
	return cities.value.map((city: any) => {
		return {
			...city,
			country: city.country.toLowerCase(),
			cityName: city.cityName.toLowerCase(),

		}
	})
}

cityStore.dispatchGetCities()
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="cities"
		class="elevation-1"
    :search="search"
    :sort-by="[{ key: 'country', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Ciudades + Visitadas</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
				<v-text-field v-model="search" label="Busqueda" class="mx-4"></v-text-field>

				<v-btn class="mb-2" color="primary"  @click="dialogAdd = true" >
					Nuevo
				</v-btn>
				<fswDialogAdd
					v-model="dialogAdd"
					:formTitle="formTitle"
					@action-result="closeModal"
				/>
				<fswDialogFile
					v-model="dialogUpload"
				/>
				<fswDialogAcept
					v-model="dialogDelete"
					@action-result="handleConfirmDelete"
					/>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        class="me-2"
        size="small"
        @click="editItem(item)"
      >
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
				</svg>
      </v-icon>
      <v-icon
				class="me-2"
        size="small"
        @click="deleteItem(item)"
      >
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
				</svg>
      </v-icon>

			<!-- <v-icon
        size="small"
        @click="uploadFile(item)"
      >
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
				</svg>
      </v-icon> -->
    </template>
  </v-data-table>
</template>

<style scoped>

</style>