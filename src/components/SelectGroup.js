import React, { useEffect, useState } from "react"
import { Grid, Typography, Button, IconButton, CircularProgress } from "@mui/material"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

import CloseIcon from '@mui/icons-material/Close';

import axios from "axios"

import logo from "../images/logo_dark_2_on_transparent_light_text.webp"

import JoinGroup from "./JoinGroup";


export default function SelectGroup({
    user, selectedOrg, setSelectedOrg, selectedGroup, setSelectedGroup, setSearch
}) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [organisations, setOrganisations] = useState([])
    const [groups, setGroups] = useState([])
    const [showGroup, setShowGroup] = useState(null)

    useEffect(() => {
        
        if (!selectedOrg) {
            setLoading(true)
            axios
            .get( process.env.REACT_APP_STRAPI_API_URL + "/api/organisations")
            .then(({ data }) => {
                setOrganisations(data.data)
                setLoading(false)
            })
            .catch((error) => setError(error))
        }
        
    }, [])

    useEffect(() => {

        if(selectedOrg) {
            setLoading(true)
            const query = process.env.REACT_APP_STRAPI_API_URL + "/api/groups?&populate=*&filters[organisation][name][$eq]=" + selectedOrg
            console.log("query:", query)
            axios
                .get( query )
                .then(({ data }) => {
                    setGroups(data.data)
                    setLoading(false)
                })
                .catch((error) => setError(error))

        }
        
    }, [selectedOrg])

    const handleSelectOrg = (event) => {
        setSelectedOrg(event.target.value)
        setSelectedGroup(null)
    }

    const handleSelectGroup = (event) => {
        setSelectedGroup(event.target.value)
    }

    const onShow = () => {
        console.log("selectedGroup:", selectedGroup)
        const element = groups.find(item => item.attributes.name === selectedGroup)
        console.log("element:", element)
        setShowGroup(element)
    }

    //if (!loading) { console.log("organisations:", organisations)}
    if (!loading) { console.log("groups:", groups)}

    console.log("selectedOrg:", selectedOrg)
    console.log("selectedGroup:", selectedGroup)
    console.log("showGroup:", showGroup)
    
    return (
        <div>
            <Grid item container direction = "column" alignItems="center" padding={4}>
                <Grid item>
                    <Button 
                        sx={{ width: "10rem", height: "10rem", color:"#fff" }}
                    >
                        <img src={logo} alt="gbeano" width="100px" height="100px"/>
                    </Button>
                </Grid>
                
                {
                    !showGroup
                        ?
                            <>
                                <Grid item>
                                    <Typography paragraph variant="h2" sx={{fontFamily:"Plus Jakarta Sans", fontSize:"1.2rem", textAlign:"center", color:"#fff"}}>
                                        The community portal for 
                                    </Typography>
                                </Grid>
                                
                                <Grid item>
                                    <Typography paragraph variant="h2" sx={{fontFamily:"Plus Jakarta Sans", fontSize:"1.2rem", textAlign:"center", color:"#fff"}}>
                                        Clubs, Non-Profits, Education & Corporate Alumni
                                    </Typography>
                                </Grid>

                                <Grid item height="30px"/>

                                <Grid item>
                                    <Typography variant="h3" sx={{fontFamily:"Plus Jakarta Sans", fontSize:"1.25rem", textAlign:"center", color:"#fff"}}>
                                        Hello {user.first_name}
                                    </Typography>
                                </Grid>
                                
                                <Grid item height="30px"/>

                                <Grid item>
                                    <FormControl>
                                        <FormLabel id="ord-radio-buttons-group-label">
                                            <Typography paragraph variant="h2" sx={{fontFamily:"Plus Jakarta Sans", fontSize:"1.25rem", textAlign:"center", color:"#fff"}}>
                                                Select organisation type and group you'd like to join:
                                            </Typography>
                                        </FormLabel>
                                        <RadioGroup
                                            aria-labelledby="org-radio-buttons-group-label"
                                            name="org-radio-buttons-group"
                                            row
                                            onChange={handleSelectOrg}
                                            value={selectedOrg}
                                        >
                                            {
                                                !loading && organisations || selectedOrg
                                                    ?
                                                        organisations.map((organisation, i) => {
                                                            return (
                                                                <FormControlLabel 
                                                                    key={i} 
                                                                    value={organisation.attributes.name}
                                                                    control={
                                                                        <Radio 
                                                                            sx={{
                                                                                fontFamily:"Plus Jakarta Sans", 
                                                                                fontSize:"1rem", 
                                                                                color:"grey"
                                                                            }}
                                                                        />} 
                                                                    label={organisation.attributes.name}
                                                                    sx={{
                                                                        fontFamily:"Plus Jakarta Sans", 
                                                                        fontSize:"1rem", 
                                                                        color:"#fff"
                                                                    }}
                                                                />
                                                            )
                                                            
                                                        })
                                                    :
                                                        loading
                                                            ?
                                                                <Grid item container justifyContent="center">
                                                                    <CircularProgress/>
                                                                </Grid>
                                                            :
                                                                undefined

                                            }
                                        </RadioGroup>


                                    </FormControl>
                                </Grid>

                                <Grid item height="30px"/>

                                <Grid item>
                                    <FormControl>
                                        <FormLabel id="group-radio-buttons-group-label">
                                            <Typography paragraph variant="h2" sx={{fontFamily:"Plus Jakarta Sans", fontSize:"1.25rem", textAlign:"center", color:"#fff"}}>
                                                {
                                                    selectedOrg !== null
                                                        ?
                                                            "available groups:"
                                                        :
                                                            undefined
                                                }
                                            </Typography>
                                        </FormLabel>
                                        <RadioGroup
                                            aria-labelledby="group-radio-buttons-group-label"
                                            name="group-radio-buttons-group"
                                            onChange={handleSelectGroup}
                                        >
                                            {
                                                groups && !loading
                                                    ?
                                                        groups.map((group, i) => {
                                                            return (
                                                                <FormControlLabel 
                                                                    key={i} 
                                                                    value={group.attributes.name}
                                                                    control={
                                                                        <Radio 
                                                                            sx={{
                                                                                fontFamily:"Plus Jakarta Sans", 
                                                                                fontSize:"1rem", 
                                                                                color:"grey"
                                                                            }}
                                                                        />} 
                                                                    label={group.attributes.name}
                                                                    sx={{
                                                                        fontFamily:"Plus Jakarta Sans", 
                                                                        fontSize:"1rem", 
                                                                        color:"#fff"
                                                                    }}
                                                                />
                                                            )
                                                            
                                                        })
                                                    :
                                                        selectedOrg
                                                            ?
                                                                <Grid item container justifyContent="center">
                                                                    <CircularProgress/>
                                                                </Grid>
                                                                
                                                            :
                                                                undefined
                                            }
                                        </RadioGroup>

                                    </FormControl>
                                </Grid>

                                <Grid item height="50px"/>

                                <Grid item>
                                    {
                                        selectedGroup
                                            ?
                                                <>
                                                    <Button 
                                                        visable={selectedGroup}
                                                        onClick={onShow} 
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
                                                        See Group Info
                                                    </Button>
                                                </>
                                            :
                                                undefined
                                    }
                                    
                                </Grid>

                            </>
                        :
                            <>
                                <JoinGroup user={user} showGroup={showGroup} setShowGroup={setShowGroup}/>
                            </>
                }

                <Grid item container justifyContent="center" marginTop={4}>
                    {
                        selectedOrg
                            ?
                                <IconButton onClick={()=>{
                                    setShowGroup(null)
                                    setSelectedGroup(null)
                                    setSelectedOrg(null)
                                }}>
                                    <CloseIcon sx={{color:"#a6c2f4"}}/>
                                </IconButton>
                            :
                                undefined

                    }
                    
                </Grid>
                
            </Grid>
        </div>
    )
}