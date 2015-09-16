// a CKEditor widget for displaying citations exposed as a general plugin
// export default {
//     // require the general widget plugin
//     requires: 'widget',
//     // when the editor is instantiated
//     init: (editor) => {
//         // add the widget to the editor
//         editor.widgets.add('table', {
//             // the root element for the citation 
//             // note: this is not the citation element so that we can easily set the innerHTML for different types
//             template: '<table class="rich-table"></table>',
//             parts: {
//                 main: '.rich-table'
//             },
//             // check if an element is one of these widgets
//             upcast: (element) => {
//                 console.log('upcasting')
//                 return element.name == 'table' && element.hasClass('rich-table')
//             },
//             // called when the widget recieves new data
//             data: function() {
//                 // the main element
//                 let main_element = this.parts.main 
//                 // the used data entries
//                 const {table_html, caption} = this.data
//                 // set the inner html of the table
//                 main_element.setHtml(table_html)
//                 // prepend the caption to the table
//                 main_element.append(caption, true)
//             },
//             // called when the widget is being edited
//             edit: function() {
//                 // save a reference to the element for the widget
//                 const element = this.element
//                 let self = this

//                 let blocking_variable = false

//                 // the callback that creates a citation out of the data from the modal
//                 function insert_callback(table_html, caption) {
//                     // set the widget data
//                     this.setData({
//                         table_html: table_html,
//                         caption: caption
//                     })
                    
//                     // set the block variable to a value that will keep the editing alive
//                     blocking_variable = 'continue'
//                 }

//                 // cancel the editing lifecycle
//                 function cancel_edit(){
//                     // set the blocking value to the special one that kills it
//                     blocking_variable = 'dont-edit'
//                 }


//                 // TODO: replace blocking magic with async/await refactoring of open_citaion_modal
//                 while(!blocking_variable){
//                     let value = prompt('text?')
//                     let table_html = prompt('table html?')
//                     if(table_html){
//                         insert_callback(table_html, prompt('caption?') )
//                     } else {
//                         cancel_edit()
//                     }
//                 }

//                 if (blocking_variable == 'dont-edit'){
//                     return false
//                 }
//             }
//         })
//     }
// }


// a CKEditor widget for displaying citations exposed as a general plugin
export default {
    // require the general widget plugin
    requires: 'widget',
    // when the editor is instantiated
    init: (editor) => {
        // add the widget to the editor
        editor.widgets.add('table', {
            // the root element for the citation 
            // note: this is not the citation element so that we can easily set the innerHTML for different types
            template: '<table class="rich-table"></table>',
            parts: {
                main: 'table'
            },
            // check if an element is one of these widgets
            upcast: (element) => {
                return element.name == 'table'
            },
            // called when the widget recieves new data
            data: function() {
                // grab the necessary data
                const {table, caption} = this.data
                // the root element of the widget
                let main_element = this.parts.main

                // set the inner html of the table
                main_element.setHtml(table)
                // if they supplied a caption
                if(caption) {
                    // create the caption element
                    const caption_element = new CKEDITOR.dom.element('caption')
                    // set the contents of the caption
                    caption_element.setHtml(caption)
                    // prepend the caption element
                    main_element.append(caption_element, true)
                }
            },
            // called when the widget is being edited
            edit: function() {
                // save a reference to the element for the widget
                const element = this.element
                let self = this

                let blocking_variable = false

                // the callback that creates a citation out of the data from the modal
                const insert_callback = (table, caption) => {
                    
                    // update the widget data
                    this.setData({
                        table: table,
                        caption: caption
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
                    const table = prompt('table')
                    // if they supplied both
                    if(table){
                        insert_callback(table, prompt('comment'))
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

