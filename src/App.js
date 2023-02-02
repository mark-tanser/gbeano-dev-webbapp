import React, { useEffect } from 'react';

import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';

import logo from "./images/gbeano-logo-600px.png"

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import { Grid, Button, IconButton, Typography} from "@mui/material"

const tele = window.Telegram.WebApp

function App() {

  useEffect(() => {
    tele.ready()
  }, [])

  const onGo = () => {
    tele.MainButton.text = "Join a Group"
    tele.MainButton.show()
  }

  return (
    <div className="App">

      <Grid container direction="row" justifyContent="center" alignItems="flex-start" sx={{ backgroundColor:"#e8772d", height:"100vh" }}>
          <Grid item container xs={12} justifyContent="center" alignItems="center" direction="column" sx={{ mt:5 }}>
            <Button 
              sx={{ width: "18rem", height: "18rem", color:"#fff" }}
            >
              <img src={logo} alt="gbeano" width="200px" height="200px"/>
            </Button>

            <Typography paragraph variant="h2" sx={{fontSize:"2rem", textAlign:"center", color:"#fff"}}>
              High power community portal
            </Typography>
            <Typography variant="h3" sx={{fontSize:"1rem", textAlign:"center", color:"#fff"}}>
              Join a community today!
            </Typography>
            <br/><br/>

            <IconButton 
              sx={{ p: 0, borderRadius: 1 }}
            >                             
              <Grid container direction="row" marginTop={3}>
                <Button variant="contained" onClick={onGo} sx={{backgroundColor:"#fff"}}>
                  <Typography variant="h3" sx={{ fontSize:"1.5rem", mr:1, p:1, color:"#e8772d"}}>
                    LETS<br/>GO
                  </Typography>
                  <RocketLaunchRoundedIcon 
                    sx={{ fontSize: { xs:'1.75rem', md:'2rem', lg:'2.25rem', xl:'2.5rem'}, borderRadius:"25%", color:"#e8772d" }}
                  />
                </Button>
              </Grid>                       
            </IconButton>

          </Grid>

        </Grid>

    </div>
  );
}

export default App;
