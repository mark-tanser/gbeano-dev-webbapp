import React, { useEffect, useState } from 'react'
import { Grid } from "@mui/material"

import LetsGo from './components/LetsGo'
import SelectGroup from './components/SelectGroup'

import "@fontsource/ibm-plex-sans/400.css"
import "@fontsource/plus-jakarta-sans/400.css"
import "@fontsource/plus-jakarta-sans/600.css"

console.log("NODE_ENV:", process.env.NODE_ENV)

function App() {

  const [search, setSearch] = useState(false)
  const [selectedOrg, setSelectedOrg] = useState(null)
  const [selectedGroup, setSelectedGroup] = useState(null)

  const testUser = { 
    id: "438223935",  
    first_name: "Mark",
    last_name: "Tanser",
    username: "Mark_T1000",
    language_code: "en",
    photo_url: "none"
  }

  let isDevelopment = false
  if (process.env.NODE_ENV === "development") { isDevelopment = true }
  let tele = null
  let initData = ""
  let user = testUser

  
  if (!isDevelopment) {
    tele = window.Telegram.WebApp
    initData = new URLSearchParams(tele.initData)
    user = JSON.parse(initData.get("user"))
  }
  
  console.log("user:", user)

  useEffect(() => {
    if (!isDevelopment) {tele.ready()}
  }, [])

  return (
    <div className="App">

      <Grid container direction="row" justifyContent="center" alignItems="flex-start" sx={{ backgroundColor:"#1e293b", height:"200vh" }} padding={1}>
          
          {
            !search 
              ?
                <LetsGo 
                  user={user} 
                  search={search} 
                  setSearch={setSearch}
                />
              :
                
                <SelectGroup 
                  user={user} 
                  selectedOrg={selectedOrg}
                  setSelectedOrg={setSelectedOrg}
                  selectedGroup={selectedGroup} 
                  setSelectedGroup={setSelectedGroup}
                  setSearch={setSearch}
              />
                 
          }

      </Grid>

    </div>
  );
}

export default App;
