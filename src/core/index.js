// third party imports
import debounce from 'lodash/function/debounce'

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

        // configure the cke environment
        this.configureEnvironment()
        // when the dom is ready
        this.editor.on('contentDom', event => {
            // attach the necessary event handlers
            this.attachEventHandlers()
        })
    }


    configureEnvironment() {

    }


    remove() {
        this.editor.remove()
    }


    attachEventHandlers() {
        // make sure the event handle is debounced
        const notifyUI = debounce(() => {
            // grab the current selection
            let selection = this.editor.getSelection()
        })

        // whenever the content of the editor changes
        this.editor.document.on('keyup', notifyUI)
        this.editor.document.on('mouseup', notifyUI)
    }
}