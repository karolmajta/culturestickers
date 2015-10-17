var React = require('react/addons');
var _ = require('underscore');
var request = require('browser-request');

var images = [
    {url: 'http://placehold.it/350x350'},
    {url: 'http://placehold.it/351x351'},
    {url: 'http://placehold.it/352x352'}
];


var ImagePicker = React.createClass({
    componentDidMount: function () {
        this.search();
    },
    getInitialState: function () {
        return {
            search: 'Picasso',
            images: [],
            loading: false
        }
    },
    render: function() {
        return (
            <div>
                <div className='form-group'>
                    <input className='form-control search'
                           value={this.state.search}
                           onChange={(function (e) { this.setState({search: e.target.value}); }).bind(this)}
                           onKeyUp={(function (e) { if (e.key == 'Enter') { this.search() } }).bind(this)} />
                </div>
                <div>
                    {_.map(this.state.images, function (i) {
                        return (
                            <div className="image-container image-container--3-in-row">
                                <img className="image-responsive" src={i.url} key={i.url} onClick={(function () { this.props.onImageSelect(i); }).bind(this)}  />
                            </div>
                        );
                    }, this)}
                    <div>
                        {this.state.loading ? <i className="fa fa-spinner fa-4x fa-spin"></i> : undefined}
                    </div>
                </div>
            </div>
        );
    },
    search: function () {
        this.setState({loading: true, images: []});
        var url = 'https://www.rijksmuseum.nl/api/en/collection/?key=A2wwhduk&format=json&v=&s=&q='+this.state.search+'&ii=0&p=1';
        request(url, (function(er, response, body) {
            this.setState({loading: false});
            if(er) {
                throw er;
            } else {
                var data = JSON.parse(body);
                this.setState({images: _.filter(_.pluck(data.artObjects, 'webImage'), _.identity)});
            }
        }).bind(this));
    }
});

module.exports = ImagePicker;
