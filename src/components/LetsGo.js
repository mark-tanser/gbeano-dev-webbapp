import React from "react"
import { Grid, Typography, Button } from "@mui/material"

import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';

import logo from "../images/logo_dark_2_on_transparent_light_text.webp"

export default function LetsGo({
    user, search, setSearch, initData
}) {

    const onGo = () => {
    
        //if (!isDevelopment) {
        //    tele.MainButton.text = `Hi ${user.first_name}. Click here to start`
        //    tele.MainButton.show()
        //}
    
        if (!search){ setSearch(true)}
    }
    
    return (
        <Grid item container xs={12} justifyContent="center" alignItems="center" direction="column" sx={{ mt:5 }}>
            <Button 
              sx={{ width: "18rem", height: "18rem", color:"#fff" }}
            >
              <img src={logo} alt="gbeano" width="200px" height="200px"/>
            </Button>

            <Typography paragraph variant="h2" sx={{fontFamily:"Plus Jakarta Sans", fontSize:"2rem", textAlign:"center", color:"#fff"}}>
              The community portal for 
            </Typography>
            <Typography paragraph variant="h2" sx={{fontFamily:"Plus Jakarta Sans", fontSize:"2rem", textAlign:"center", color:"#fff"}}>
              Clubs, Non-Profits, Education & Corporate Alumni
            </Typography>

            <Typography variant="h3" sx={{fontFamily:"Plus Jakarta Sans", fontSize:"1.5rem", textAlign:"center", color:"#fff"}}>
              Join a community today!
            </Typography>


            <br/><br/>
            

                                        
            <Grid container direction="row" justifyContent="center" marginTop={3}>

                <Grid item>
                  <Button 
                    onClick={onGo} 
                    variant="contained" 
                    sx={{ 
                      border: 1,
                      borderColor: "#1e293b",
                      borderRadius: 3, 
                      backgroundColor: "#a6c2f4",
                      color: "#242f41",
                      width:"100%",
                      '&:hover, &.Mui-focusVisible':{ 
                        color:"#1e293b",
                        backgroundColor:"#fff",
                        border:1,
                        borderColor:"#1e293b"
                      }
                    }}
                  >
                    <Grid item container alignItems="center">
                      <Typography variant="h2" sx={{fontFamily:"IBM Plex Sans", fontSize:"1.5rem", color:"inherit", mr:0.5, p:0.5}}>
                        LETS<br/>GO
                      </Typography>
                        <RocketLaunchRoundedIcon 
                          color="inherit"
                          sx={{ 
                            fontSize: { xs:'1.5rem', md:'1.75rem', lg:'2rem', xl:'2.5rem'},
                          }}
                      />

                    </Grid>
                                                                        
                  </Button>
                </Grid>    

                <Grid item container justifyContent="left">
                    <Typography variant="h4" sx={{fontFamily:"Plus Jakarta Sans", fontSize:"0.5rem", color:"#fff"}}>
                        {initData}
                    </Typography>
                </Grid>
                
            </Grid>                       

        </Grid>
    )
}