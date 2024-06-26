import { clearFormData } from "../utils/clearData.js";
import { removeCookies } from "../utils/cookies.js";
import { checkAccessToken } from "../utils/authorizationCheck.js";


const registerEmailInput = document.getElementById('register-email-input');
const registerPasswordInput = document.getElementById('register-password-input');
const registerPasswordCheckbox = document.getElementById('register-password-checkbox');
const registerEmailError = document.getElementById('register-email-error');
const registerPasswordError = document.getElementById('register-password-error');

export async function registerResponseValidation(registerResponse) {
    if (registerResponse.status === 201) {
        alert("Successfully registered");
        console.log("Successfully registered");
        clearFormData(registerEmailInput, registerPasswordInput, registerPasswordCheckbox);
        return true;
    } else {
        const responseErrorData = await registerResponse.json();
        const responseErrorMessage = await responseErrorData.detail.msg;
        const responseErrorLocation = await responseErrorData.detail.loc[1];
        console.error(responseErrorMessage);

        if (responseErrorLocation === "email") {
            registerEmailError.textContent = responseErrorMessage;
        } else if (responseErrorLocation === "password") {
            registerPasswordError.textContent = responseErrorMessage;
        }
        return false;
    }
}

const loginError = document.getElementById('login-error');
const loginEmailInput = document.getElementById('login-email-input');
const loginPasswordInput = document.getElementById('login-password-input');
const loginPasswordCheckbox = document.getElementById('login-password-checkbox');

export async function loginResponseValidation(loginResponse) {
    if (loginResponse.status === 200) {
        console.log("Successfully logged in");
        clearFormData(loginEmailInput, loginPasswordInput, loginPasswordCheckbox);
        return true;
    } else {
        const responseErrorData = await loginResponse.json();
        const responseErrorMessage = await responseErrorData.detail.msg;

        loginError.textContent = responseErrorMessage;
        console.error(responseErrorMessage);
        return false;
    }
}

const userId = document.getElementById('user-id-space');
const userEmail = document.getElementById('user-email-space');

export async function meResponseValidation(meResponse) {
    if (meResponse.status === 200) {
        const meResponseData = await meResponse.json();
        userId.textContent = meResponseData.id;
        userEmail.textContent = meResponseData.email;
        return true;
    } else {
        removeCookies();
        console.error("Unauthorized");
        alert("Unauthorized");
        checkAccessToken();
        return false;
    }
}

export async function refreshAccessTokenResponseValidation(refreshAccessTokenResponse) {
    if (refreshAccessTokenResponse.status === 200) {
        const responseData = await refreshAccessTokenResponse.json();
        document.cookie = `accessToken=${responseData.access_token}; path=/; SameSite=Strict;`;
        return true;
    } else {
        removeCookies();
        console.error("Unauthorized");
        alert("Unauthorized");
        checkAccessToken();
        return false;
    }
}
