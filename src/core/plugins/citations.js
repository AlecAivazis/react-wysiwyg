// a CKEditor widget for displaying citations exposed as a general plugin
export default {
    // require the general widget plugin
    requires: 'widget',
    // when the editor is instantiated
    init: (editor) => {
        // add the widget to the editor
        editor.widgets.add('citation', {
            // the root element for the citation 
            // note: this is not the citation element so that we can easily set the innerHTML for different types
            template: '<span class="rich-reference"></span>',
            inline: true,
            parts: {
                main: '.rich-reference'
            },
            // check if an element is one of these widgets
            upcast: (element) => {
                return element.name == 'span' && element.hasClass('rich-reference')
            },
            // called when the widget recieves new data
            data: function() {
                // save a local copy of the data
                const {bib_key, display_text, bib_text, type} = this.data

                // the html to use for the reference
                let element_html = '..'
                // if there is an element string to use
                if (display_text){
                    // if there is a type of the citation and it's a reference
                    if(type && type == 'ref'){
                        // build the appropriate element
                        element_html = `<a class="au-ref-link" href="#${bib_key}">${display_text}</a>`
                    //
                    } else {
                        element_html = `<cite class='ltx_cite'>${display_text}</cite>`
                    }
                }

                // save a reference to the main element
                const main_element = this.parts.main
                // set the inner html of the element
                main_element.setHtml(element_html)
                main_element.data('bib-text', bib_text)
                main_element.data('bib-key', bib_key)
            },
            // called when the widget is being edited
            edit: function() {
                // save a reference to the element for the widget
                const element = this.element
                let self = this

                let blocking_variable = false

                // the callback that creates a citation out of the data from the modal
                function insert_callback(bib_key, bib_text, type, display_text) {
                    // use the bib key if there is no display text
                    display_text = display_text || bib_key
         
                    // set the assoiciated data for the citation
                    self.setData({
                        bib_key: bib_key, 
                        bib_text: bib_text, 
                        type: type, 
                        display_text: display_text
                    })

                    // set the block variable to a value that will keep the editing alive
                    blocking_variable = 'continue'
                }

                // cancel the editing lifecycle
                function cancel_edit(){
                    // set the blocking value to the special one that kills it
                    blocking_variable = 'dont-edit'
                }


                // TODO: replace blocking magic with async/await refactoring of open_citaion_modal
                while(!blocking_variable){
                    let value = prompt('text?')
                    if(value){
                        insert_callback(value, '..', )
                    } else {
                        cancel_edit()
                    }
                }

                if (blocking_variable == 'dont-edit'){
                    return false
                }
            }
        })
    }
}