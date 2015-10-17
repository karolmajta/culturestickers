var React = require('react/addons');
var _ = require('underscore');

var images = [
    {url: 'http://placehold.it/350x350'},
    {url: 'http://placehold.it/351x351'},
    {url: 'http://placehold.it/352x352'}
];


var ImagePicker = React.createClass({
    render: function() {
        return (
            <div>
                {_.map(images, function (i) {
                    return (
                        <img src={i.url} key={i.url} onClick={(function () { this.props.onImageSelect(i); }).bind(this)}  />
                    );
                }, this)}
            </div>
        );
    }
});

module.exports = ImagePicker;