import { writable } from 'svelte/store'
import { categories } from './curriculum.js'

export const navigation = writable({
    profile: true,
    cat: categories.EXP.id,
    selected: 0
})