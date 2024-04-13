<script setup lang="ts">
import { ref } from 'vue'

const { formTitle, value, editedItem } = defineProps({
	value: { type: Boolean },
	editedItem: { type: Object, required: false },
	formTitle: String,
})

const confirmAction = ref<undefined | boolean>(undefined);
const emit = defineEmits(['actionResult'])

const handleResultAction = (value: boolean) => {
	confirmAction.value = value
	emit('actionResult', value)
}

const handleAddOrEdit = () => {
	// if (editedItem.id) {
	// 	emit('edit', editedItem)
	// } else {
	// 	emit('add', editedItem)
	// }
	handleResultAction(false)
}
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
							<v-text-field v-model="editedItem.name" label="Nombre de la ciudad"></v-text-field>
						</v-col>
						<v-col cols="12" md="4" sm="6">
							<v-text-field v-model="editedItem.country" label="País"></v-text-field>
						</v-col>
						<v-col cols="12" md="4" sm="6">
							<v-text-field v-model="editedItem.numVisits" label="Num. visitantes"></v-text-field>
						</v-col>
						<v-col cols="12" md="4" sm="6">
							<v-text-field v-model="editedItem.population" label="Num. Habitantes"></v-text-field>
						</v-col>
						<v-col cols="12" md="4" sm="6">
							<v-text-field v-model="editedItem.numHotels" label="Num. Hoteles"></v-text-field>
						</v-col>
						<v-col cols="12" md="4" sm="6">
							<v-text-field v-model="editedItem.certifications" label="Certificaciones"></v-text-field>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue-darken-1" variant="text" @click="handleResultAction(false)">
					Cancelar
				</v-btn>
				<v-btn color="blue-darken-1" variant="text" @click="handleAddOrEdit()">
					Save
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>