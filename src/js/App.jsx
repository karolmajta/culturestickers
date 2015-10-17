var React = require('react/addons');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var classnames = require('classnames');
var snapshot = require('./snapshot.js');
var _ = require('underscore');

var ImagePicker = require('./ImagePicker.jsx');
var TemplateSelect = require('./TemplateSelect.jsx');
var Preview = require('./Preview.jsx');

var App = React.createClass({
    componentDidMount: function () {
        this.imageChangeListener = _.noop;
    },
    getInitialState: function () {
        return {template: null}
    },
    render: function() {
        return (
            <div>
                <div className={classnames('left-pane', {folded: this.state.template})}>
                    <CSSTransitionGroup transitionName="left-pane-transition" transitionLeave={false}>
                        {this.leftPane()}
                    </CSSTransitionGroup>
                </div>
                <div className={classnames('right-pane', {folded: !this.state.template})}>
                    <ImagePicker onImageSelect={this.onImageSelect} />
                </div>
            </div>
        );
    },
    leftPane: function () {
        if (this.state.template) {

            return <Preview key='preview'
                            template={this.state.template}
                            onCancel={(function () { this.setState({template: null}); }).bind(this)}
                            onSave={(function () {
                              snapshot( document.getElementsByClassName('template')[0]).then(function(data){
                                  console.log(data);
                              });
                          }).bind(this)}
                            onImageChange={(function (fn) { this.imageChangeListener = fn; }).bind(this)}/>
        } else {
            this.imageChangeListener = _.noop;
            return <TemplateSelect key='template-select'
                        onSelect={(function (key) { this.setState({template: key}); }).bind(this)} />
        }
    },
    onImageSelect: function (image) {
        this.imageChangeListener(image);
    }
});

module.exports = App;
