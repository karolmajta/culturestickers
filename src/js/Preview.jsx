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
                            onClick={this.props.onSave}>
                        <i className="fa fa-file-pdf-o fa-3x"/>
                    </button>
                </div>
                <div>
                    <Elem texts={texts[this.props.template]} onImageChange={this.props.onImageChange} />
                </div>
            </div>
        );
    }
});

module.exports = Preview;
