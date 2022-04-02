import React from 'react';
import { Typography } from '@mui/material';

const styles = {};

export default class Card extends React.Component {
    constructor() {
        super();
        this.state = {
            modalOpen: null,
        };
    }

    render() {
        const { card, face = 'up', small, medium, onClick, style } = this.props;

        if (!card) {
            return (
                <div style={style}>
                    <div
                        style={{
                            width: small ? 100 : medium ? 150 : 200,
                            height: small ? 150 : medium ? 225 : 300,
                            cursor: 'pointer',
                            border: `${small ? '3' : '6'}px solid #331412`,
                            borderRadius: 8,
                            // backgroundColor: '#FFFFFF',
                        }}
                    />
                </div>
            );
        }

        const { type, name, category, status } = card;

        return (
            <div style={style}>
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
                    </div>
                </div>
                {/* <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 8 }}>
                    {level && (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginBottom: 8,
                            }}
                        >
                            Level {level}
                        </div>
                    )}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginBottom: 16,
                        }}
                    >
                        {name || 'NAME'}
                    </div>
                    <div style={{ flex: 1, alignSelf: 'flex-start' }}>{text || 'TEXT'}</div>
                    <div style={{ flex: 1, alignSelf: 'flex-start' }}>{subtext || 'SUBTEXT'}</div>
                </div> */}
            </div>
        );
    }
}
