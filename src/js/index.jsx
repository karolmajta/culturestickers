var React = require('react');
var immstruct = require('immstruct');

var App = require('./App.jsx');

var data = immstruct({
    name: 'Julek',
    count: 0,
    users: ['jasiek', 'wojtek']
}).reference();

var appComponent = React.render(React.createElement(App, {cursor: data.cursor()}), document.body);

data.observe(function (is, was, path) {
    appComponent.setProps({cursor: data.cursor()});
});