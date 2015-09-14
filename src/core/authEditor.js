// third party imports
import debounce from 'lodash/function/debounce'
import map from 'lodash/collection/map'
import unique from 'lodash/array/uniq'

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
        this.updateElementPath = this.updateElementPath.bind(this)
        this.getElementPath = this.getElementPath.bind(this)

        // configure the CKEditor environment
        this.configureEnvironment()
        // when the dom is ready
        this.editor.on('contentDom', event => {
            // attach the necessary event handlers
            this.attachEventHandlers()
        })
    }


    configureEnvironment() {
        this.editor.config.extraAllowedContent = 'strong em u blockquote'
    }


    remove() {
        this.editor.remove()
    }


    execCommand(command, ...args) {
        console.log(`executing ${command} with args: ${args}`)
        // execute the given command
        this.editor.execCommand(command, ...args)
        // update the element path after execuitng the command
        this.updateElementPath()
    }


    selectionUpdated(){
        // grab the current selection
        let selection = this.editor.getSelection()

        // update the element path
        this.updateElementPath()
    }


    getElementPath() {
        // generate a unique mapping of the element path
        return unique(map(this.editor.elementPath().elements, (element) => {
            // with the name of the element
            return element.getName ? element.getName() : ''
        }))
    }


    updateElementPath() {
        // get the names of elements in the element path
        const elementPath = this.getElementPath()
        console.log(elementPath)
    }


    attachEventHandlers() {
        // grab the editable instance of the editor
        let editor = this.editor.editable()
        // bind the necessary functions
        editor.on('keyup', debounce(this.selectionUpdated))
        editor.on('mouseup', debounce(this.selectionUpdated))
    }
}