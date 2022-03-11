import React from 'react';
import './App.css';
import {BrowserRouter as Router, NavLink, Route, Routes} from 'react-router-dom'
import {Grid, Menu, MenuItem} from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Lists from "@mui/icons-material/ListAlt";
import GiveConsent from "./components/GiveConsent";
import Consents from "./components/Consents";

function App() {
  return (
      <Router>
      <Grid container justifyContent="center">
          <Grid item xs={2}>
            <Menu open>
                <MenuItem>
                    <NavLink to="/give-consent" className={({isActive}) => 'link' + (isActive ? ' activeLink' : '')}>
                        {/*<PermIdentityIcon/>*/}
                        <h2>Give consent</h2>
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to="/consents" className={({isActive}) => 'link' + (isActive ? ' activeLink' : '')}>
                        {/*<Lists/>*/}
                        <h2>Collected consents</h2>
                    </NavLink>
                </MenuItem>
            </Menu>
            <Grid item xs={6} style={{margin: '20px'}}>
                <Routes>
                    <Route path='/' element={<GiveConsent/>}/>
                    <Route path='/give-consent' element={<GiveConsent/>}/>
                    <Route path='/consents' element={<Consents/>}/>
                </Routes>
            </Grid>
          </Grid>
      </Grid>
      </Router>
  );
}

export default App;
