<script setup lang="ts">
import { ref } from 'vue'
import fswDialogAcept from './fswDialogAcept.vue'
import fswDialogAdd from './fswDialogAdd.vue'
import { useCityStore } from '../store/cities'
import { storeToRefs } from "pinia";
import { InputUpdateCity, InputCreateCity } from '../services/cities/types';

const dialogAdd = ref(false)
const dialogDelete = ref(false)

const cityStore = useCityStore()
const { cities } =  storeToRefs(cityStore)

const editedIndex = ref(-1)

const cityEdit = ref<InputUpdateCity | InputCreateCity | null>(null)

const editedItem = ref({
	name: '',
	country: 0,
	numVisits: 0,
	population: 0,
	numHotels: 0,
	certifications: 0,
})
const defaultItem = {
	name: '',
	country: 0,
	numVisits: 0,
	population: 0,
	numHotels: 0,
	certifications: 0,
}
const headers = [
	{ title: 'Ciudad', align: 'start', key: 'cityName' },
	{ title: 'Pais', key: 'country' },
	{ title: 'Num. visitantes', key: 'numVisits' },
	{ title: 'Num. Habitantes', key: 'population' },
	{ title: 'Num. Hoteles', key: 'numHotels' },
	{ title: 'Certificaiones', key: 'certifications' },
	{ title: 'Actions', key: 'actions', sortable: false },
]

const formTitle = 'City Form'
const handleAddOrEdit = (result: boolean) => {
	console.log("Result ", result);
	if (result) {
		// save();
	}
	close();
}
const close = () => {
	dialogAdd.value = false
}
const save = () => {
	if (editedIndex.value > -1) {
		Object.assign(desserts[editedIndex.value], editedItem.value)
	} else {
		desserts.push(editedItem.value)
	}
	close()
}
const editItem = (item: any) => {
	editedIndex.value = desserts.indexOf(item)
	editedItem.value = Object.assign({}, item)
	dialogAdd.value = true
}
const deleteItem = (item: any) => {
	editedIndex.value = desserts.indexOf(item)
	dialogDelete.value = true
}
const closeDelete = () => {
	dialogDelete.value = false
}
const deleteItemConfirm = () => {
	desserts.splice(editedIndex.value, 1)
	closeDelete()
}

const handleConfirmDelete = (result: boolean) => {
	console.log("Result ", result);
	if (result) {
		deleteItemConfirm();
	}
	closeDelete();
}

cityStore.dispatchGetCities()
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="cities"
    :sort-by="[{ key: 'country', order: 'asc' }]"
  >
		<!-- <pre>{{ cities }}</pre> -->
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
				<v-btn class="mb-2" color="primary" dark  @click="dialogAdd = true" >
					Nuevo
				</v-btn>
				<fswDialogAdd
					v-model="dialogAdd"
					:editedItem="editedItem"
					:formTitle="formTitle"
					@action-result="handleAddOrEdit"
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
        size="small"
        @click="deleteItem(item)"
      >
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
			</svg>
      </v-icon>
    </template>
  </v-data-table>
</template>

<style scoped>

</style>