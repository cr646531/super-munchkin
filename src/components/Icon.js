import React, { Component } from 'react';

const styles = {
    small: {
        height: 32,
        width: 32,
        objectFit: 'cover',
    },
    large: {
        height: 64,
        width: 64,
        objectFit: 'cover',
    },
};
class Icon extends Component {
    render() {
        const { category, icon, small } = this.props;

        return <img src={`/icons/${category}/${icon}.png`} alt='nope' style={small ? styles.small : styles.large} />;
    }
}

export default Icon;
