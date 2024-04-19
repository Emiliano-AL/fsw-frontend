<script setup lang="ts">
import { ref } from 'vue'
import { useCityStore } from '../store/cities'
import { storeToRefs } from "pinia";
import { InputUpdateCity, InputCreateCity } from '../services/cities/types'
const cityStore = useCityStore()
const { city } = storeToRefs(cityStore)

const { formTitle, value } = defineProps({
	value: { type: Boolean },
	formTitle: String,
})

const confirmAction = ref<undefined | boolean>(undefined);
const emit = defineEmits(['actionResult'])

const handleCancelAction = (value: boolean) => {
	confirmAction.value = value
	emit('actionResult', value)
}

const handleAddOrEdit = () => {
	if( city.value.id && city.value.id > 0 ) {
		const cityUpdtd: InputUpdateCity = {
			id: city.value.id,
			cityName: city.value.cityName,
			country: city.value.country,
			numVisits: city.value.numVisits,
			population: city.value.population,
			numHotels: city.value.numHotels,
			certifications: city.value.certifications,
		}
		cityStore.dispatchUpdateCity(city.value.id, cityUpdtd)
	} else {
		const cityNew : InputCreateCity = {
			cityName: city.value.cityName,
			country: city.value.country,
			numVisits: city.value.numVisits,
			population: city.value.population,
			numHotels: city.value.numHotels,
			certifications: city.value.certifications,
		}
		cityStore.dispatchCreateCity(cityNew)
	}

	handleCancelAction(false)
}


const cityRules = [
	v => !!v || 'El campo es requerido',
	v => (v && v.length <= 10) || 'El campo debe tener menos de 10 caracteres',
]

const countryRules = [
	v => !!v || 'El campo es requerido',
]

const numbersRules = [
	v => !!v || 'El campo es requerido',
	v => (v && v >= 0) || 'El campo debe ser mayor o igual a 0',
]

</script>
<template>
	<v-dialog :value="value" max-width="700px">
		<v-card>
			<v-card-title>
				<span class="text-h5">{{ formTitle }}</span>
			</v-card-title>

			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols="12" md="4" sm="6">
							<v-text-field
								v-model="city.cityName"
								:rules="cityRules"
								label="Nombre de la ciudad">
							</v-text-field>
						</v-col>
						<v-col cols="12" md="4" sm="6">
							<v-text-field
								v-model="city.country"
								:rules="countryRules"
								label="País">
							</v-text-field>
						</v-col>
						<v-col cols="12" md="4" sm="6">
							<v-text-field
								:rules="numbersRules"
								:min="1"
								v-model="city.numVisits"
								type="number"
								label="Num. visitantes">
							</v-text-field>
						</v-col>
						<v-col cols="12" md="4" sm="6">
							<v-text-field
								:rules="numbersRules"
								v-model="city.population"
								type="number"
								label="Num. Habitantes">
							</v-text-field>
						</v-col>
						<v-col cols="12" md="4" sm="6">
							<v-text-field
								:rules="numbersRules"
								v-model="city.numHotels"
								type="number"
								label="Num. Hoteles">
							</v-text-field>
						</v-col>
						<v-col cols="12" md="4" sm="6">
							<v-text-field
								:rules="numbersRules"
								v-model="city.certifications"
								type="number"
								label="Certificaciones">
							</v-text-field>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue-darken-1" variant="text" @click="handleCancelAction(false)">
					Cancelar
				</v-btn>
				<v-btn color="blue-darken-1" variant="text" @click="handleAddOrEdit()">
					Save
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>