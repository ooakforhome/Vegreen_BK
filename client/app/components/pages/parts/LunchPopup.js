import React, { Component } from 'react';
import Modal from 'react-awesome-modal';

class LunchPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false
        }
    }

    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

    render() {
        return (
            <section>
              <img alt="Lunch" src="../assets/img/Set_Menu.jpg" onClick={() => this.openModal()}/>
                <input type="button" value="Open" onClick={() => this.openModal()} />
                <Modal visible={this.state.visible} width="400" height="700" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <h1>LUNCH</h1>
                        <img alt="Lunch" src="../assets/img/Soft_Lunch.jpg" />
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                    </div>
                </Modal>
            </section>
        );
    }
}

export default LunchPopup;
