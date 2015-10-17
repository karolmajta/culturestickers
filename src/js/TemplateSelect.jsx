var React = require('react/addons');
var _ = require('underscore');

var ComicSticker = require('./templates/ComicSticker.jsx');
var RectSticker = require('./templates/RectSticker.jsx');
var RoundSticker = require('./templates/RoundSticker.jsx');


var templates = {
    comic: ComicSticker,
    rect: RectSticker,
    round: RoundSticker
};

var TemplateSelect = React.createClass({
    render: function() {
        var templateElements = _.map(templates, function (Elem, key) {
            return <Elem key={key} onClick={(function () { this.props.onSelect(key); }).bind(this)}
                                   onImageChange={_.noop}/>
        }, this);

        return (
            <div className='template-select'>
                {templateElements}
            </div>
        );
    }
});

module.exports = TemplateSelect;