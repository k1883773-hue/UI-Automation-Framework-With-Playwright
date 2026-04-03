import { Login } from "../../dataObject/Login.js";

export class LoginData {

    getValidData() {
        const loginData = new Login();
        loginData.email = "test0808@yopmail.com",
            loginData.password = "Test@123";
            return loginData;
    }

    getInvalidData() {
        const loginData = new Login();
        loginData.email = "test@gmail.com";
        loginData.password = "Test@111";
        return loginData;
    }

    getInvalidEmailFormatData() {
        const loginData = new Login();
        loginData.email = "test";
        loginData.password = "Test@111";
        return loginData;
    }
}
