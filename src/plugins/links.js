// a CKEditor widget for displaying links exposed as a general plugin
export default {
    // require the general widget plugin
    requires: 'widget',
    // when the editor is instantiated
    init: (editor) => {
        // add the widget to the editor
        editor.widgets.add('link', {
            // the root element for the citation 
            // note: this is not the citation element so that we can easily set the innerHTML for different types
            template: '<a target="_blank"></a>',
            parts: {
                main: 'a'
            },
            // check if an element is one of these widgets
            upcast: (element) => {
                return element.name == 'a' && element.attributes.target == "_blank"
            },
            // called when the widget recieves new data
            data: function() {
                // grab the necessary data
                const {text, url} = this.data
                // the root element of the widget
                let main_element = this.parts.main

                // set the href
                main_element.setAttribute('href', url)
                // set the inner html
                main_element.setHtml(text)
            },
            // called when the widget is being edited
            edit: function() {
                // save a reference to the element for the widget
                const element = this.element
                let self = this

                let blocking_variable = false

                // the callback that creates a citation out of the data from the modal
                const insert_callback = (text, url, close_modal) => {
                    
                    // update the widget data
                    this.setData({
                        text: text,
                        url: url
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
                    // grab the text for the link
                    const text = prompt('text?')
                    // only ask for the text if there is a url
                    const url = !text || prompt('url?')
                    // mock the callback function
                    const close_modal = () => {}
                    // if they supplied both
                    if(text && url){
                        insert_callback(text, url, )
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