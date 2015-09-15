// a CKEditor widget for displaying citations

const element_template = '<cite class="au-cite">' + 
                            'foo' +
                         '</cite>'

// export the widget
export default {
    requires: 'widget,dialog',

    // when the editor is instantiated
    init: (editor) => {
        // add the widget to the editor
        editor.widgets.add('citation', {
            // the html to display for the widget
            template: element_template,
            inline: true,
            // check if an element is a citation
            upcast: (element) => {
                return element.name == 'cite' && element.hasClass('au-cite')
            },
            parts: {
                cite_text: '.au-cite'
            },
            // called when the widget recieves new data
            data: function() {
                // save a reference to the cite element
                let cite_element = this.parts.cite_text
                // set the inner html of the cite element
                cite_element.setHtml(this.data.text || '..')
                cite_element.data('bib-text', this.data.text)
            },
            edit: function() {

                // the callback that creates a citation out of the data from the modal
                const insert_callback = (bib_key, bib_text, type, display_text) => {
                    console.log('calling callback')
                    // use the bib key if there is no display text
                    display_text = display_text || bib_key

                    console.log('updating state')
                    this.setData({text: display_text})
                }

                // save a reference to the element for the widget
                const element = this.element
                // save the bib text
                const bibText = element.data('bib-text')

                // open the citation modal 
                open_citation_modal()
            },
        })
    }
}