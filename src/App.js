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
    id: "000000001",  
    first_name: "[First Name]",
    last_name: "[Last Name]",
    username: "[username]",
    language_code: "[en]",
    photo_url: "[]"
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

      <Grid container direction="row" justifyContent="center" alignItems="flex-start" sx={{ backgroundColor:"#1e293b", height:"100vh" }} padding={1}>
          
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
