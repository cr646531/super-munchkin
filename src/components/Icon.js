import React, { Component } from 'react';

const styles = {
    img: {
        height: 32,
        width: 32,
        objectFit: 'cover',
    },
};
class Icon extends Component {
    render() {
        const { type, icon } = this.props;

        return <img src={`/icons/${type}/${icon}.png`} alt='nope' style={styles.img} />;
    }
}

export default Icon;
