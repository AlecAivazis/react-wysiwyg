
'use strict'

// third party imports
import React from 'react/addons'
import StyleSheet from 'react-style'
// local imports
import StaticElement from './staticElement'
import AuthEditor from '../core'


class RichEditor extends React.Component {

    
    static propTypes = {
        initialContent: React.PropTypes.string,
    }


    static defaultProps = {
        initialContent: 'some initial content'
    }


    constructor(props) {
        // instantiate this
        super(props)
        // set the initial state
        this.state = {}
    }


    // called when the component is first mounted
    componentDidMount() {
        // create the authorea editor instance around the node
        this.editor = new AuthEditor(React.findDOMNode(this.refs['editor_element']))
        // when the selection changes, we need to update the toolbar
    }


    // called before the component is removed from the dom
    componentWillUnmount() {
        this.editor.remove()
    }


    // render the component
    render() {
        // pull out the used properties
        const {initialContent, ...unused_props} = this.props
        // render the component
        return (
            <div {...unused_props}>
                {/* use a static element and let CKEditor take it over */}
                <StaticElement contentEditable={true} ref="editor_element" 
                               innerHTML={initialContent}/>
            </div>
        )
    }
}

const styles = StyleSheet.create({})


export default RichEditor


// end of file