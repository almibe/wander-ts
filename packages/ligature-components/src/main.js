import './style.css'
import { run, toJs } from "@ligature/ligature"
import { showEditor } from './editor/editor'
import { showText } from './text/text'
import { showTable } from './table/table'
import { showGraph } from './graph/graph'

const initalScript = `core.id {a b c}`

let editor = showEditor(document.querySelector("#editor"), initalScript)

document.querySelector("#runButton")?.addEventListener("click", () => {
    let res = run(editor.state.doc.toString())
    showText(document.querySelector("#text"), res)
    showTable(document.querySelector("#table"), toJs(res))
    showGraph(document.querySelector("#graph"), toJs(res))
})
