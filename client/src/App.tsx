import React from 'react';
import './App.css';
import {BrowserRouter as Router, NavLink, Route, Routes} from 'react-router-dom'
import {Grid, MenuItem} from "@mui/material";
import GiveConsent from "./components/GiveConsent";
import Consents from "./components/Consents";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";

function App() {
  return (
      <Router>
      <Grid container justifyContent="center">
          <Grid item xs={2}>
              <Stack direction="row" spacing={2}>
                  <Paper>
                      <MenuList>
                          <MenuItem>
                              <NavLink to="/give-consent" className={({isActive}) => 'link' + (isActive ? ' activeLink' : '')}>
                                <h2>Give consent</h2>
                              </NavLink>
                          </MenuItem>
                          <MenuItem>
                              <NavLink to="/consents" className={({isActive}) => 'link' + (isActive ? ' activeLink' : '')}>
                                  <h2>Collected consents</h2>
                              </NavLink>
                          </MenuItem>
                      </MenuList>
                  </Paper>
              </Stack>
          </Grid>
            <Grid item xs={6} style={{margin: '20px'}}>
                <Routes>
                    <Route path='/' element={<GiveConsent/>}/>
                    <Route path='/give-consent' element={<GiveConsent/>}/>
                    <Route path='/consents' element={<Consents/>}/>
                </Routes>
            </Grid>
      </Grid>
      </Router>
  );
}

export default App;
