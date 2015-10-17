var React = require('react/addons');
var Modal = require('react-modal');


var RectSticker = React.createClass({
    componentDidMount: function () {
        this.props.onImageChange((function (image) {
            this.setState({image: image});
        }).bind(this));
    },
    getInitialState: function () {
        return {
            modalIsOpen: false,
            firstText: this.props.texts ? (this.props.texts[0] || 'TEXT') : 'TEXT',
            secondText: this.props.texts ? (this.props.texts[1] || 'TEXT') : 'TEXT',
            image: null,
            edited: null,
            editedText: ''
        };
    },
    render: function() {
        return (
            <div className='template rect' {...this.props}>
                <div className='subtitle upper'
                     onClick={(function () { this.openModal('firstText'); }).bind(this)}>
                    {this.state.firstText}
                </div>
                <div className='comic-box'
                     style={{backgroundImage: this.state.image ? 'url('+this.state.image.url+')' : null}}></div>
                <div className='subtitle lower'
                     onClick={(function () { this.openModal('secondText'); }).bind(this)}>
                    {this.state.secondText}
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.hideModal} >

                    <h2>Wprowadź tekst...</h2>
                    <form>
                        <textarea value={this.state.editedText}
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

module.exports = RectSticker;