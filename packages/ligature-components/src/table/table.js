import {TabulatorFull as Tabulator} from 'tabulator-tables'
import  "tabulator-tables/dist/css/tabulator.min.css"

function networkToTableData(network) {
    const columns = {}
    const data = new Map()
    for (let triple of network.VAL) {
        columns[triple.role.value] = []
        if (data.has(triple.element.value)) {
            const entry = data.get(triple.element.value)
            if (entry.has(triple.role.value)) {
                const values = entry.get(triple.role.value)
                values.push(triple.value.value)
            } else {
                const values = [triple.value.value]
                entry.set(triple.role.value, values)
            }
        } else {
            const entry = new Map()
            const values = [triple.value.value]
            entry.set(triple.role.value, values)
            data.set(triple.element.value, entry)
        }
    }
    let result = []
    data.forEach((entries, element) => {
        const id = {id : element }
        const e = Object.fromEntries(entries)
        result.push({...id, ...columns, ...e})
    })
    return result
}

export function showTable(element, network) {
    return new Tabulator(element, {
        data: networkToTableData(network),
        autoColumns: true
    })    
}
