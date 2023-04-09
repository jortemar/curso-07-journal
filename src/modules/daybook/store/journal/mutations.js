// Son síncronas. Hacen la modificación del state. 
// El state es reactivo, se va a notificar los cambios
// a cada componente que esté escuchando los cambios del state


// export const myAction = (/* state */) => {

// }

export const setEntries = (state, entries) => {
    state.entries = [...state.entries, ...entries]
    state.isLoading = false
}

export const updateEntry = (state, entry) => { // entry actualizada

    const idx = state.entries.map(e => e.id).indexOf(entry.id) // ['ABC', 'XYZ']
    // al ponerlo entre llave me muestra también el nombre de la variable, no solo su valor
    // console.log({idx})
    // console.log(idx)

    state.entries[idx] = entry


    // state.entries = [...state.entries, ...entry]

}

export const addEntry = (state, entry) => {
    state.entries = [entry, ...state.entries]
    // state.entries.unshift(entry)
}

export const deleteEntry = (state, id) => {
    state.entries = state.entries.filter(entry => entry.id !== id)
    // borrar del state.entries el que coincida con el id que entra
}