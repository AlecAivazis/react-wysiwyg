
'use strict'

// third party imports
import React from 'react/addons'
import StyleSheet from 'react-style'


class Toolbar extends React.Component {

    
    static propTypes = {}


    static defaultProps = {}


    constructor(props) {
        // instantiate this
        super(props)
        // set the initial state
        this.state = {}
    }


    // called when the component is first mounted
    componentDidMount() {}


    // called before the component is removed from the dom
    componentWillUnmount() {}


    // render the component
    render() {
        // pull out the used properties
        const {editor, ...unused_props} = this.props
        // render the component
        return editor ? (
            <div {...unused_props}>
                <button onClick={editor.bold}>bold</button>
                <button onClick={editor.underline}>underline</button>
                <button onClick={editor.italic}>italic</button>
                <button onClick={editor.blockquote}>blockquote</button>
                <button onClick={editor.header.bind(this, 1)}>h1</button>
                <button onClick={editor.header.bind(this, 2)}>h2</button>
                <button onClick={editor.header.bind(this, 3)}>h3</button>
                <button onClick={editor.numberedList}>ol</button>
                <button onClick={editor.unorderedList}>ul</button>
                <button onClick={editor.indentList}>indent</button>
                <button onClick={editor.outdentList}>outdent</button>
                <button onClick={editor.insertCitation}>citation</button>
                <button onClick={editor.equation}>equation</button>
                <button onClick={editor.link}>link</button>
            </div>
        ) : <div {...unused_props} />
    }
}

const styles = StyleSheet.create({})


export default Toolbar


// end of file
