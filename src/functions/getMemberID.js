import React from "react"
import axios from "axios"

export default function getMemberID(user) {

    return axios
        .post(
            process.env.REACT_APP_STRAPI_API_URL + "/api/members/get-member-id",
            { user },
            { headers: undefined }
        )
        .then(response => {
            const { memberID } = response.data
            console.log("memberID", memberID)
            return memberID          
        })
        .catch(error => {
            console.log("there was an error retrieving memberID")
            console.error(error)
            return null
        })

}