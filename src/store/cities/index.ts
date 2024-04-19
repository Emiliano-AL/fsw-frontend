import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { City, InputCreateCity, InputUpdateCity } from '../../services/cities/types'
import { API } from '../../services'
import { APIResponse } from '../../services/types'
import { AxiosError } from 'axios'

export const useCityStore = defineStore("cityStore", () => {
	const cities = ref<City[]>([])
	const city = ref<City>({})
	const hasProcess = ref(false)

	function initCities(list: City[]) {
		cities.value = list
	}

	function addNewCity(school: City) {
    cities.value.push(school);
  }

  function removeCity(id: number) {
    const idx = cities.value.findIndex((s) => s.id === id);
    if (idx === -1) return;
    cities.value.splice(idx, 1);
  }

	const currentCity = (idx: number) => {
		city.value = cities.value.find((city) => city.id === idx) || null
	}

	const resetCity = () => {
		city.value = Object.create({})
	}

	async function dispatchGetCities() : Promise<APIResponse<null>> {
		try {
			hasProcess.value = true
			const data = await API.cities.getCities()
			const { content, statusCode } = data.data;
			if (statusCode === 200) {
				initCities(content)
				return {
					success: true,
					content: null
				}
			}
		} catch (error) {
			const _error = error as AxiosError<string>;
			return {
        success: false,
        status: _error.response?.status,
        content: null,
      };
		} finally {
			hasProcess.value = false;
		}
		return {
      success: false,
      content: null,
      status: 400,
    };
	}

	async function dispatchCreateCity(input: InputCreateCity) : Promise<APIResponse<null>> {
		try {
			hasProcess.value = true
			const data = await API.cities.createCity(input)
			const { content, statusCode } = data.data;
			if (statusCode === 200) {
				addNewCity(content)
				return {
					success: true,
					content: null
				}
			}
		} catch (error) {
			const _error = error as AxiosError<string>;
			return {
				success: false,
				status: _error.response?.status,
				content: null,
			};
		} finally {
			hasProcess.value = false;
		}
		return {
			success: false,
			content: null,
			status: 400,
		};
	}

	async function dispatchDeleteCity(id: number) : Promise<APIResponse<null>> {
		try {
			hasProcess.value = true
			const { status } = await API.cities.deleteCity(id)
			if (status === 200) {
				removeCity(id)
				return {
					success: true,
					content: null
				}
			}
		} catch (error) {
			const _error = error as AxiosError<string>;
			return {
				success: false,
				status: _error.response?.status,
				content: null,
			};
		} finally {
			hasProcess.value = false;
		}
		return {
			success: false,
			content: null,
			status: 400,
		};
	}

	async function dispatchUpdateCity(id: number, input: InputUpdateCity) : Promise<APIResponse<null>> {
		try {
			hasProcess.value = true
			const { status } = await API.cities.updateCity(id, input)
			if (status === 200) {
				return {
					success: true,
					content: null
				}
			}
		} catch (error) {
			const _error = error as AxiosError<string>;
			return {
				success: false,
				status: _error.response?.status,
				content: null,
			};
		} finally {
			hasProcess.value = false;
		}
		return {
			success: false,
			content: null,
			status: 400,
		};
	}


	return {
		cities,
		city,
		processing: computed(() => hasProcess.value),
		initCities,
		removeCity,
		dispatchCreateCity,
		dispatchDeleteCity,
		dispatchGetCities,
		dispatchUpdateCity,
		currentCity,
		resetCity,
	}

});