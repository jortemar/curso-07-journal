import journalApi from "@/api/journalApi"

export const loadEntries = async ({ commit }) => {

    const { data } = await journalApi.get('/entries.json')

    // esta comprobación nos permite que no se quede colgada
    // la aplicación cuando no haya ninguna entrada
    if (!data) {
        commit('setEntries', [])
        return
    }

    // Buscamos obtener un array (entries), que contendrá objetos
    // que tendrán un id, text, y date (las dos últimas las obtenemos de ...data[id])
    // El operador spread se encarga de desplegar el contenido que
    // tiene el data en cada posición del objeto que nos devuelve nuestra
    // petición GET, y que recorremos con el bucle 'for'

    const entries = []

    for (let id of Object.keys(data)) {
        entries.push({
            id,
            ...data[id]
        })
    }

    commit('setEntries', entries)
}

export const updateEntry = async ({ commit }, entry) => {  // entry debe ser un parámetro

    // Extraer solo lo que necesitamos  // quitar id
    const { date, picture, text } = entry
    const dataToSave = { date, picture, text }

    const resp = await journalApi.put(`/entries/${entry.id}.json`, dataToSave)
    //console.log(resp)

    // desestructuramos con el operador spread para evitar que el objeto se pase por referencia
    commit('updateEntry', {...entry})
}

export const createEntry = async ({ commit }, entry) => {

    const { date, picture, text } = entry
    const dataToSave = { date, picture, text }
    
    const { data } = await journalApi.post(`/entries.json`, dataToSave)
    
    // data = { "name": "-NSMRobK3XyEzYb3f54C" }
    dataToSave.id = data.name

    commit('addEntry', dataToSave)

    return data.name
}

export const deleteEntry = async ({ commit }, id) => {

    await journalApi.delete(`/entries/${id}.json`)
    commit('deleteEntry', id )

    return id
}