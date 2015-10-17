var React = require('react/addons');
var Modal = require('react-modal');
var $ = require('jquery');


var RoundSticker = React.createClass({
    componentDidMount: function () {
      console.log(this.props.blah);
      if (this.props.blah) {
        this.setState(this.props.blah);
      }


        var comicBox = React.findDOMNode(this.refs.comicBox);
        var $comicBox = $(comicBox);
        $comicBox.height($comicBox.width());
        // this is hacky as hell..
        this.refreshInterval = window.setInterval(function () {
            $comicBox.height($comicBox.width());
        }, 10);
        window.setTimeout((function () {
           window.clearInterval(this.refreshInterval);
        }).bind(this), 500);

        this.props.onImageChange((function (image) {
            this.setState({image: image});
        }).bind(this));
    },
    componentWillUnmount: function () {
        window.clearInterval(this.refreshInterval);
    },
    getInitialState: function () {
        return {
            modalIsOpen: false,
            firstText: this.props.texts ? (this.props.texts[0] || 'TEXT') : 'TEXT',
            edited: null,
            editedText: ''
        };
    },
    render: function() {
        return (
            <div className='template round' {...this.props}>
                <div className='comic-box' ref='comicBox'
                     style={{backgroundImage: this.state.image ? 'url('+this.state.image.url+')' : null}}>
                </div>
                <div className='subtitle'
                     onClick={(function () { this.openModal('firstText'); }).bind(this)}>
                    {this.state.firstText}
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.hideModal} >

                    <h2>Wprowadź tekst...</h2>
                    <form>
                        <textarea  className="modal__textarea" value={this.state.editedText}
                                  onChange={(function (e) { this.setState({editedText: e.target.value}); }).bind(this)}/>
                    </form>
                    <button onClick={this.submitModal}>OK</button>
                </Modal>
            </div>
        );
    },
    openModal: function (key) {
        this.setState({
            modalIsOpen: true,
            edited: key,
            editedText: this.state[key]
        });
    },
    hideModal: function () {
        this.setState({modalIsOpen: false, edited: null, editedText: null});
    },
    submitModal: function () {
        var s = {};
        s[this.state.edited] = this.state.editedText;
        this.setState(s);
        this.hideModal();
    }
});

module.exports = RoundSticker;
