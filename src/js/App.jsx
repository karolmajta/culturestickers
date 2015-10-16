var React = require('react/addons');

var App = React.createClass({
    render: function() {
        var cursor = this.props.cursor;

        return (
            <div>
                <h1>Hello, {cursor.get('name')}. Count is: {cursor.get('count')}</h1>
                <button onClick={function () { cursor.update('count', function (c) { return c+1; }  ) }}>Elo</button>
            </div>
        );
    }
});

module.exports = App;