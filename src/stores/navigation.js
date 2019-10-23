import { writable } from 'svelte/store'
import { categories } from './curriculum.js'

export const navigation = writable({
    profile: false,
    cat: categories.PROJ.id,
    selected: 0
})