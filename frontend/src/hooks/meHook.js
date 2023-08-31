import { baseUrl } from "./config.js";
import { getCookie, removeCookie } from "../utils/cookies.js";
import { checkAccessToken } from "../utils/authorizationCheck.js";


const requestUrl = `${baseUrl}/users/me`;

async function meRequest() {
    try {
        const meResponse = await fetch(requestUrl, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${getCookie("accessToken")}`
            }
        })
        if (meResponse.status === 200) {
            const meResponseData = await meResponse.json();
            displayUserData(meResponseData);
        } else {
            removeCookie();
            console.error("Unauthorized");
            alert("Unauthorized");
            checkAccessToken();
        }
        return meResponse;

    } catch (error) {
        removeCookie();
        console.error(`Internal Server Error, ${error}`);
        alert("Server error");
        checkAccessToken();
    }
}

function displayUserData(userData) {
    const userId = document.getElementById('user-id');
    const userEmail = document.getElementById('user-email');
  
    userId.textContent = userData.id;
    userEmail.textContent = userData.email;
}

meRequest();