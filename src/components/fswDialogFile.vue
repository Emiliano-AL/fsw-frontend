<script setup lang="ts">
import { ref } from 'vue'

const { value } = defineProps({
	value: { type: Boolean },
})


const file = ref<File | null>(null)
// const { title, message, value } = defineProps({
// 	title: { type: String, default: 'Eliminar' },
// 	message: { type: String, default: 'Estas por eliminar, este item, quieres continuar?' },
// 	value: { type: Boolean },
// })

// const confirmAction = ref<undefined | boolean>(undefined);

// const emit = defineEmits(['actionResult'])

// const handleResultAction = (value: boolean) => {
// 	confirmAction.value = value
// 	emit('actionResult', value)
// }
</script>
<template>
	<div class="text-center pa-4">
    <v-dialog
			:value="value"
      max-width="400"
      persistent
    >
      <v-card
        title="Upload file"
      >
				<v-card-text>
					<v-row>
						<v-col cols="12">
							<v-file-input
								v-model="file"
								label="File input"
								accept="pdf"
								outlined
								dense
							></v-file-input>
						</v-col>
					</v-row>
				</v-card-text>
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="dialog = false">
            Disagree
          </v-btn>

          <v-btn @click="dialog = false">
            Agree
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>