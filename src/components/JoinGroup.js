import React, {useState} from "react"
import { Grid, Typography, Button } from "@mui/material"

import axios from "axios"

import getMemberID from "../functions/getMemberID"
import getSubscription from "../functions/getSubscription"


export default function JoinGroup({
    user, showGroup, setShowGroup
}) {

    const [applied, setApplied] = useState(false)
    const [application, setApplication] = useState(null)

    const newApplicationMessage = "Thank you for applying. The group administrator will review and contact you directly."
    const existingApplicationMessage = "You have already applied for this group. Please review the information below..."
    //TODO: change these to state and set from cms data fields

    const onJoin = async () => {
        setApplied(true)

        console.log("showGroup:", showGroup)
        const groupID = showGroup.id
        console.log("groupID:", groupID)

        try {
            // retrieve member id from existing member or create new member
            const memberID = await getMemberID(user)
            console.log("memberID:", memberID)    

            // retrieve existing subscription info or create new subscription
            const subscription = await getSubscription(memberID, groupID)
            console.log("subscription:", subscription)  

            setApplication(subscription)

        } catch (error) {
            console.error(error);
        }

        // display subscription status and membership id
        // show actions
    }

    console.log("application:", application)

    return (
        <Grid item container direction="column" alignItems="center">
            <Grid item>
                <Typography 
                    paragraph 
                    variant="h2" 
                    sx={{fontFamily:"Plus Jakarta Sans", fontSize:"1.5rem", fontWeight:"700", textAlign:"center", color:"#fff"}}
                >
                    {showGroup.attributes.name}
                </Typography>
            </Grid>

            {
                showGroup.attributes.logo?.data?.attributes?.url
                    ?
                        <Grid item justifyContent="center" sx={{backgroundColor:"#fff", opacity:"90%"}} marginTop={1} marginBottom={1}>
                            <img 
                                src={showGroup.attributes.logo.data.attributes.url} 
                                alt={showGroup.attributes.name}
                                width="150px"
                            />
                        </Grid>
                    :
                        undefined
            }

            <Grid item>
                <Typography 
                    paragraph 
                    variant="h2" 
                    sx={{fontFamily:"Plus Jakarta Sans", fontSize:"1.2rem", textAlign:"center", color:"#fff"}}
                >
                    {showGroup.attributes.introduction ?? ""}
                </Typography>
            </Grid>

            <Grid item>
                <Typography 
                    paragraph 
                    variant="h2" 
                    sx={{fontFamily:"Plus Jakarta Sans", fontSize:"1rem", lineHeight:"130%", textAlign:"center", color:"#fff"}}
                >
                    {showGroup.attributes.description ?? ""}
                </Typography>
            </Grid>

            <Grid item container direction="row" justifyContent="space-evenly">
                <Grid item>
                    <Typography 
                        paragraph 
                        variant="h2" 
                        sx={{fontFamily:"Plus Jakarta Sans", fontSize:"0.8rem", textAlign:"center", color:"#fff"}}
                    >
                        {showGroup.attributes.telephone ?? ""}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography 
                        paragraph 
                        variant="h2" 
                        sx={{fontFamily:"Plus Jakarta Sans", fontSize:"0.8rem", textAlign:"center", color:"#fff"}}
                    >
                        {showGroup.attributes.website ?? ""}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography 
                        paragraph 
                        variant="h2" 
                        sx={{fontFamily:"Plus Jakarta Sans", fontSize:"0.8rem", textAlign:"center", color:"#fff"}}
                    >
                        {showGroup.attributes.email ?? ""}
                    </Typography>
                </Grid>
            </Grid>

            <Grid item marginTop={2}>
                <Typography 
                    paragraph 
                    variant="h2" 
                    sx={{fontFamily:"Plus Jakarta Sans", fontSize:"0.9rem", lineHeight:"130%", textAlign:"center", color:"#fff"}}
                >
                    Membership terms and subscriptions information:
                </Typography>
            </Grid>

            <Grid item marginTop={2} marginBottom={4}>
                <Typography 
                    paragraph 
                    variant="h2" 
                    sx={{fontFamily:"Plus Jakarta Sans", fontSize:"0.8rem", lineHeight:"130%", textAlign:"center", color:"#fff"}}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
            </Grid>

            <Grid item>
                {
                    applied && application
                        ?
                            <>
                                <Grid item>
                                    <Typography 
                                        paragraph 
                                        variant="h2" 
                                        sx={{
                                            fontFamily:"Plus Jakarta Sans", 
                                            fontSize:"1rem", 
                                            lineHeight:"200%", 
                                            textAlign:"center", 
                                            color:"#fff"}}
                                    >
                                        {
                                            application.status.id === 1
                                                ?
                                                    newApplicationMessage
                                                :
                                                    existingApplicationMessage
                                        }

                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <Typography 
                                        paragraph 
                                        variant="h2" 
                                        sx={{
                                            fontFamily:"Plus Jakarta Sans", 
                                            fontSize:"1rem", 
                                            lineHeight:"200%", 
                                            textAlign:"center", 
                                            color:"#fff"}}
                                    >
                                        Application status: {application.status.name}<br/>
                                        Updated: {application.createdAt.slice(0,10)}
                                    </Typography>
                                </Grid>
                                
                            </>
                        :
                            <>
                                <Button 
                                    onClick={onJoin} 
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
                                    Apply to join
                                </Button>
                            </>
                 }
            </Grid>

        </Grid>
    )
}