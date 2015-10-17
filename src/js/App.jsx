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
        return {template: null, print: false, blah: null}
    },
    render: function() {
      if(!this.state.print)
      {
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
      } else {
        return <div className="print-view"><Preview key='preview'
                        template={this.state.template}
                        onCancel={(function () { this.setState({print: false}); }).bind(this)}
                        blah={this.state.blah}
                        onSave={(function () {
                          window.print();
                      }).bind(this)}
                        onImageChange={(function (fn) { this.imageChangeListener = fn; }).bind(this)}/></div>
      }

    },
    leftPane: function () {
        if (this.state.template) {

            return <Preview key='preview'
                            template={this.state.template}
                            onCancel={(function () { this.setState({template: null}); }).bind(this)}
                            onSave={(function (state) {
                              console.log('state:', state);
                              this.setState({print: true, blah: state});
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
