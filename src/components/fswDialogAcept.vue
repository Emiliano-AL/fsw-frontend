<script setup lang="ts">
import { ref } from 'vue'

const { title, message, value } = defineProps({
	title: { type: String, default: 'Eliminar' },
	message: { type: String, default: 'Estas por eliminar, este item, quieres continuar?' },
	value: { type: Boolean },
})

const confirmAction = ref<undefined | boolean>(undefined);

const emit = defineEmits(['actionResult'])

const handleResultAction = (value: boolean) => {
	confirmAction.value = value
	emit('actionResult', value)
}
</script>
<template>
	<v-dialog :value="value" max-width="500px">
		<v-card>
			<v-card-title>
				<h3>{{ title }}</h3>
			</v-card-title>
			<v-card-body>
				<p class="mx-4 mb-3">{{ message }}</p>
				<v-divider></v-divider>
			</v-card-body>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue-darken-1" variant="text" @click="handleResultAction(false)">Cancelar</v-btn>
				<v-btn color="blue-darken-1" variant="text" @click="handleResultAction(true)">OK</v-btn>
				<v-spacer></v-spacer>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>