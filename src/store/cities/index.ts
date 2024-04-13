import { defineStore } from 'pinia'
import { ref } from 'vue'
import { City, InputCreateCity, InputUpdateCity } from '../../services/cities/types'
import { API } from '../../services'
import { APIResponse } from '../../services/types'
import { AxiosError } from 'axios'

export const useCityStore = defineStore("cityStore", () => {
	const cities = ref<City[]>([])

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

	async function dispatchGetCities() : Promise<APIResponse<null>> {
		try {
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
		}
		return {
      success: false,
      content: null,
      status: 400,
    };
	}

	async function dispatchCreateCity(input: InputCreateCity) : Promise<APIResponse<null>> {
		try {
			const { status, data } = await API.cities.createCity(input)
			if (status === 201) {
				addNewCity(data.content)
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
		}
		return {
			success: false,
			content: null,
			status: 400,
		};
	}

	async function dispatchDeleteCity(id: number) : Promise<APIResponse<null>> {
		try {
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
		}
		return {
			success: false,
			content: null,
			status: 400,
		};
	}

	async function dispatchUpdateCity(input: InputUpdateCity) : Promise<APIResponse<null>> {
		try {
			const { status } = await API.cities.updateCity(input)
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
		}
		return {
			success: false,
			content: null,
			status: 400,
		};
	}


	return {
		cities,
		initCities,
		removeCity,
		dispatchCreateCity,
		dispatchDeleteCity,
		dispatchGetCities,
		dispatchUpdateCity
	}

});