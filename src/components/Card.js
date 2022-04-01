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
        const { type = 'door', face = 'up', level, name, text, subtext, small, onClick } = this.props;

        return (
            <div>
                <div
                    style={{
                        width: small ? 100 : 200,
                        height: small ? 150 : 300,
                        // border: `${small ? '3' : '6'}px solid ${isEmpty ? '#FFFFFF' : '#331412'}`,
                        // borderRadius: 16,
                        // backgroundColor: '#FFFFFF',
                        cursor: 'pointer',
                        backgroundImage: type && face ? `url(/cards/${type}_${face}.png)` : 'url(/cards/door_up.png)',
                        backgroundSize: 'contain',
                    }}
                    onClick={onClick}
                />
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
