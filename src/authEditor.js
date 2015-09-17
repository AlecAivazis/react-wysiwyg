// third party imports
import debounce from 'lodash/function/debounce'
import map from 'lodash/collection/map'
import unique from 'lodash/array/uniq'
// local imports
import CitationWidget from './plugins/citations'
import TableWidget from './plugins/tables'
import EquationWidget from './plugins/equations'
import LinkWidget from './plugins/links'

// handle the underlying logic of the authorea editor
export default class AuthEditor {
    // called when the class is instantiated
    constructor(node) {
        // instantiate CKEditor over the specified node
        this.editor = CKEDITOR.inline(node)

        // bind various functions before we setup
        this.configureEnvironment = this.configureEnvironment.bind(this)
        this.attachEventHandlers = this.attachEventHandlers.bind(this)
        this.remove = this.remove.bind(this)
        
        this.selectionUpdated = this.selectionUpdated.bind(this)
        this.getElementPath = this.getElementPath.bind(this)

        this.bold = this.bold.bind(this)
        this.header = this.header.bind(this)
        this.italic = this.italic.bind(this)
        this.underline = this.underline.bind(this)
        this.blockquote = this.blockquote.bind(this)
        this.numberedList = this.numberedList.bind(this)
        this.unorderedList = this.unorderedList.bind(this)
        this.indentList = this.indentList.bind(this)
        this.outdentList = this.outdentList.bind(this)
        this.insertCitation = this.insertCitation.bind(this)
        this.equation = this.equation.bind(this)
        this.link = this.link.bind(this)
        this.table = this.table.bind(this)

        // configure the CKEditor environment
        this.configureEnvironment()
        // when the dom is ready
        this.editor.on('contentDom', event => {
            // attach the necessary event handlers
            this.attachEventHandlers()
        })
    }


    configureEnvironment() {
        // add the necessary plugins to the editor environment
        CKEDITOR.plugins.add('citations', CitationWidget)
        CKEDITOR.plugins.add('equations', EquationWidget)
        CKEDITOR.plugins.add('links', LinkWidget)
        CKEDITOR.plugins.add('tables', TableWidget)

        // configure the CKEnvironment
        this.editor.config.extraAllowedContent = 'strong em u blockquote ol ul cite a table'
        this.editor.config.extraPlugins = 'citations,equations,links,tables'
    }


    remove() {
        this.editor.remove()
    }


    execCommand(command, ...args) {
        // execute the given command
        this.editor.execCommand(command, ...args)
    }


    bold() {
        this.execCommand('bold')
    }

    italic(){
        this.execCommand('italic')
    }

    underline(){
        this.execCommand('underline')
    }

    blockquote() {
        this.execCommand('blockquote')
    }

    numberedList() {
        this.execCommand('numberedlist')
    }

    unorderedList() {
        this.execCommand('bulletedlist')
    }

    indentList() {
        this.execCommand('indentlist')
    }

    outdentList() {
        this.execCommand('outdentlist')
    }

    insertCitation() {
        this.execCommand('citation')
    }

    equation(){
        this.execCommand('equation')
    }

    link() {
        this.execCommand('link')
    }

    table() {
        this.execCommand('table')
    }


    header(level) {
        // create the CKEditor style for the headers
        const style = new CKEDITOR.style({element: `h${level}`})
        // if the style is already applied
        if(style.checkActive(this.getElementPath(), this.editor)) {
            // remove the style
            this.editor.removeStyle(style)
        // otherwise the style has not been applied to the selection
        } else {
            /// apply the style
            this.editor.applyStyle(style)
        }
    }


    selectionUpdated(){
        // grab the current selection
        let selection = this.editor.getSelection()
    }


    getElementPath() {
        // return the CKEditor path object
        return this.editor.elementPath()
    }


    attachEventHandlers() {
        // grab the editable instance of the editor
        let editor = this.editor.editable()
        // bind the necessary functions
        editor.on('keyup', debounce(this.selectionUpdated))
        editor.on('mouseup', debounce(this.selectionUpdated))
    }
}