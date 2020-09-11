import React, {useState, useEffect} from 'react';
import Layaout from '../../parcials/Layaout';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {
    getTicketsSystemTransferCreated,
    getTicketsSystemTransferAssigned,
    getPhotoRetreats,
    getExternalRetreats
} from '../../../functions/ticketFunction';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
// };

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
const HistoryTickets = () => {
    const [value, setValue] = useState(0);
    const [dataTicketsCreated, setdataTicketsCreated] = useState([]);
    const [dataTicketsAssigned, setdataTicketsAssigned] = useState([]);
    const [photoRetreats, setphotoRetreats] = useState([]);
    const [externalRetreats, setExternalRetreats] = useState([]);

    const handleChange2 = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(()=>{
        getTicketsTransferCreated()
        getTicketsTransferAsigned()
        getTicketsPhotoRetreats()
        getTicketsExternalRetreats()
    },[])

    function getTicketsTransferCreated(){
        getTicketsSystemTransferCreated().then((res) => setdataTicketsCreated(res));
    }
    function getTicketsTransferAsigned(){
        getTicketsSystemTransferAssigned().then((res) => setdataTicketsAssigned(res));
    }
    function getTicketsPhotoRetreats(){
        getPhotoRetreats().then((res) => setphotoRetreats(res));
    }
    function getTicketsExternalRetreats(){
        getExternalRetreats().then((res) => setExternalRetreats(res.result));
    }
    return (
        <Layaout>
            <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange2}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Traslado de Sistema" {...a11yProps(0)} />
                        <Tab label="Entregas Inemdiatas" {...a11yProps(1)} />
                        <Tab label="Retiros Externos" {...a11yProps(2)} />
                        <Tab label="Retiros Fotografía" {...a11yProps(3)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>Traslados de Sistema</TabPanel>
                <TabPanel value={value} index={1}>Entregas Inmeditas</TabPanel>
                <TabPanel value={value} index={2}>Retiros Externos</TabPanel>
                <TabPanel value={value} index={3}>Retiro Fotografía</TabPanel>
        </Layaout>
    )
}

export default HistoryTickets;