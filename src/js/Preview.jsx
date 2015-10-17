var React = require('react/addons');

var ComicSticker = require('./templates/ComicSticker.jsx');
var RectSticker = require('./templates/RectSticker.jsx');
var RoundSticker = require('./templates/RoundSticker.jsx');


var templates = {
    comic: ComicSticker,
    rect: RectSticker,
    round: RoundSticker
};

texts = {
    comic: ['No elo...', 'Elo!', 'No to elo...'],
    rect: ['Górny tekst', 'Dolny tekst...'],
    round: ['Zacny sticker milordzie']
};

var Preview = React.createClass({
    componentDidMount: function () {
        
    },
    render: function() {
        var Elem = templates[this.props.template];

        return (
            <div className='preview'>
                <div>
                    <button className="btn btn-default btn-left"
                            onClick={this.props.onCancel}>
                        <i className="chevron-next fa fa-chevron-left fa-3x" />
                    </button>
                    <button className='btn btn-default btn-right'
                            onClick={(function () { this.props.onSave(this.refs.elem.state); }).bind(this)}>
                        <i className="fa fa-file-pdf-o fa-3x"/>
                    </button>
                </div>
                <div className="print">
                    <Elem texts={texts[this.props.template]} onImageChange={this.props.onImageChange} blah={this.props.blah} ref='elem' />
                </div>
            </div>
        );
    }
});

module.exports = Preview;
