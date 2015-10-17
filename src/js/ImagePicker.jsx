var React = require('react/addons');
var _ = require('underscore');

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
                            <img src={i.url} key={i.url} onClick={(function () { this.props.onImageSelect(i); }).bind(this)}  />
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
        window.setTimeout((function () {
            this.setState({loading: false, images: images});
        }).bind(this), 2000);
    }
});

module.exports = ImagePicker;