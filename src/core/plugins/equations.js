import katex from 'katex'

// a CKEditor widget for displaying citations exposed as a general plugin
export default {
    // require the general widget plugin
    requires: 'widget',
    // when the editor is instantiated
    init: (editor) => {
        // add the widget to the editor
        editor.widgets.add('equation', {
            // the root element for the citation 
            // note: this is not the citation element so that we can easily set the innerHTML for different types
            template: '<span class="ltx_Math"></span>',
            inline: true,
            parts: {
                main: '.ltx_Math'
            },
            // check if an element is one of these widgets
            upcast: (element) => {
                return element.name == 'span' && element.hasClass('ltx_Math')
            },
            // called when the widget recieves new data
            data: function() {
                // the equation_string
                const {equation_string} = this.data 
                // the root element of the widget
                let main_element = this.parts.main
                // if the equation string is defined
                if (equation_string){
                    // fill the element with the rendered equation
                    main_element.setHtml(katex.renderToString(equation_string))
                    // set the data attribute of the element
                    main_element.data('equation', equation_string)
                // otherwise there is no defined equation
                } else {
                    // remove anything else that is inside the element 
                    // note: there might be already rendered equations here
                    main_element.setHtml('double click to insert an equation')   
                }
            },
            // called when the widget is being edited
            edit: function() {
                // save a reference to the element for the widget
                const element = this.element

                let blocking_variable = false

                // the callback that creates a citation out of the data from the modal
                let insert_callback = (equation_string) => {
                    // set the assoiciated data for the citation
                    this.setData({equation_string: equation_string})
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
                        insert_callback(value)
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