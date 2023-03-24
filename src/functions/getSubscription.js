import React from "react"
import axios from "axios"

export default function getSubscription(memberID, groupID) {

    if (memberID && groupID) {

        return axios
            .post(
                process.env.REACT_APP_STRAPI_API_URL + "/api/subscriptions/get-subscription",
                { memberID, groupID },
                { headers: undefined }
            )
            .then(response => {
                const { subscription } = response.data
                console.log("subscription", subscription)
                return subscription         
            })
            .catch(error => {
                console.log("there was an error retrieving subscription details")
                console.error(error)
                return null
            })

    } else {
        return null
    }
}