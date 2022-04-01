import React, { Component } from 'react';
import { Button, Drawer, Typography } from '@mui/material';
import { Card } from '@components';
import { connect } from 'react-redux';

const modals = {
    HAND: 'HAND',
};

const styles = {
    scrollableRow: {
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'scroll',
    },
};

class Toolbelt extends Component {
    constructor() {
        super();
        this.state = {
            modalOpen: null,
        };
    }

    render() {
        const { hand } = this.props;
        const { modalOpen } = this.state;

        return (
            <div>
                {hand.length ? (
                    <div
                        style={{ display: 'flex', flexDirection: 'row', overflowX: 'scroll', maxWidth: 400 }}
                        onClick={() => this.setState({ modalOpen: modals.HAND })}
                    >
                        {hand.map((card, index) => (
                            <div key={index} style={{ marginRight: -60 }}>
                                <Card type={card.type} small />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div />
                )}
                <Drawer
                    anchor='bottom'
                    open={modalOpen === modals.HAND}
                    onClose={() => this.setState({ modalOpen: null })}
                >
                    <div style={styles.scrollableRow} onClick={() => this.setState({ modalOpen: modals.HAND })}>
                        {hand.map((card, index) => (
                            <div key={index} style={{ margin: 24 }}>
                                <Card key={index} type={card.type} />
                            </div>
                        ))}
                    </div>
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = ({ hand }) => {
    return { hand };
};

export default connect(mapStateToProps, {})(Toolbelt);
