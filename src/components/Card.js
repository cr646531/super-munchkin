import React from 'react';
import { Typography } from '@mui/material';
import { Icon } from '@components';

const styles = {
    tapped: {
        transform: 'rotate(90deg)',
    },
};

export default class Card extends React.Component {
    constructor() {
        super();
        this.state = {
            modalOpen: null,
        };
    }

    render() {
        const { card, face = 'up', small, medium, onClick, style, tapped } = this.props;

        if (!card || !card.type) {
            return (
                <div style={style}>
                    <div
                        style={{
                            width: small ? 100 : medium ? 150 : 200,
                            height: small ? 150 : medium ? 225 : 300,
                            cursor: 'pointer',
                            border: `${small ? '3' : '6'}px solid #331412`,
                            borderRadius: 8,
                        }}
                    >
                        {card && card.name && (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography variant='p'>{card.name}</Typography>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        const { type, name, category, status, icon, bonus, equipped } = card;

        return (
            // <div style={!equipped && type === 'treasure' ? styles.tapped : null}>
            <div>
                <div
                    style={{
                        width: small ? 100 : medium ? 150 : 200,
                        height: small ? 150 : medium ? 225 : 300,
                        cursor: 'pointer',
                        backgroundImage: type && face ? `url(/cards/${type}_${face}.png)` : 'url(/cards/door_up.png)',
                        backgroundSize: 'contain',
                    }}
                    onClick={onClick}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant='p'>{name}</Typography>
                        <div style={{ marginBottom: 16 }} />
                        {category && icon ? <Icon category={category} icon={icon} small={small} /> : <div />}
                        {bonus && (
                            <div style={{ marginTop: 16 }}>
                                <Typography variant='h5'>+{bonus}</Typography>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
