import { writable } from 'svelte/store'
import { categories } from './curriculum.js'

export const selectedPage = writable(true)
export const selectedItem = writable({
    cat: categories.EXP.id,
    item: 0
})