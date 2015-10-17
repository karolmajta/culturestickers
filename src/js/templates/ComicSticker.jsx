var React = require('react/addons');
var Modal = require('react-modal');
var classnames = require('classnames');


var ComicSticker = React.createClass({
    componentDidMount: function () {
        this.props.onImageChange((function (image) {
            var s = {};
            s[this.state.active] = image;
            this.setState(s);
        }).bind(this));
    },
    getInitialState: function () {
        return {
            modalIsOpen: false,
            active: 'firstImage',
            firstText: this.props.texts ? (this.props.texts[0] || 'TEXT') : 'TEXT',
            secondText: this.props.texts ? (this.props.texts[1] || 'TEXT') : 'TEXT',
            thirdText: this.props.texts ? (this.props.texts[2] || 'TEXT') : 'TEXT',
            firstImage: null,
            secondImage: null,
            thirdImage: null,
            edited: null,
            editedText: ''
        };
    },
    render: function() {
        return (
            <div className='template comic'>
                <div {...this.props}>
                    <div className={classnames('comic-box', {active: this.state.active == 'firstImage' || this.state.firstImage})}
                         onClick={(function () { this.setState({active: 'firstImage'}); }).bind(this)}
                         style={{backgroundImage: this.state.firstImage ? 'url('+this.state.firstImage.url+')' : null}}>
                        <div className='subtitle first'
                             onClick={(function () { this.openModal('firstText'); }).bind(this)}>
                            {this.state.firstText}
                        </div>
                    </div>
                    <div className={classnames('comic-box', {active: this.state.active == 'secondImage' || this.state.secondImage})}
                         onClick={(function () { this.setState({active: 'secondImage'}); }).bind(this)}
                         style={{backgroundImage: this.state.secondImage ? 'url('+this.state.secondImage.url+')' : null}}>
                        <div className='subtitle second'
                             onClick={(function () { this.openModal('secondText'); }).bind(this)}>
                            {this.state.secondText}
                        </div>
                    </div>
                    <div className={classnames('comic-box', {active: this.state.active == 'thirdImage' || this.state.thirdImage})}
                         onClick={(function () { this.setState({active: 'thirdImage'}); }).bind(this)}
                         style={{backgroundImage: this.state.thirdImage ? 'url('+this.state.thirdImage.url+')' : null}}>
                        <div className='subtitle third'
                             onClick={(function () { this.openModal('thirdText'); }).bind(this)}>
                            {this.state.thirdText}
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.hideModal} >

                    <h2>Wprowadź tekst...</h2>
                    <form>
                        <textarea className="modal__textarea" value={this.state.editedText}
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

module.exports = ComicSticker;
