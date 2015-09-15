// a CKEditor widget for displaying citations
export default {
    requires: 'widget,dialog',

    // when the editor is instantiated
    init: (editor) => {
        // add the widget to the editor
        editor.widgets.add('citation', {
            // the html to display for the widget
            template: '<cite class="au-cite">foo</cite>',
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
                // set the inner html of the cite element
                this.parts.cite_text.setHtml(this.data.text)
            },
            edit: function() {

                const text = prompt('insert text')
                if (text) {
                    // set the widget data
                    this.setData({text: text})
                } else {
                    return false
                }
            }
        })
    }
}