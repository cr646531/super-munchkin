import * as React from 'react';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import ListItemText from '@mui/material/ListItemText';
// import ListItem from '@mui/material/ListItem';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import { Card, CombatPopover } from '@components';
import { monsters } from '@constants';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function Combat(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { monstersInCombat } = props;
    const monsters = [];
    for (let i = 0; i < monstersInCombat.length; i++) {
        let monster = monstersInCombat[i];
        console.log(monster.id);
    }
    console.log('monstersInCombat: ', monstersInCombat);

    renderContent = () => {
        return (
            <div>
                <button onClick={() => setOpen(true)}>Here</button>
                {monstersInCombat.map((monster, index) => (
                    <Card key={index} card={monster} />
                ))}
            </div>
        );
    };

    return (
        <div>
            <Button variant='outlined' onClick={handleClickOpen}>
                Open full-screen dialog
            </Button>
            <CombatPopover></CombatPopover>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                {renderContent()}
            </Dialog>
        </div>
    );
}

const mapStateToProps = ({ monstersInCombat }) => {
    return {
        monstersInCombat,
    };
};

export default connect(mapStateToProps, {})(Combat);
