import axios from "../config/AxiosConfig"
import { AxiosResponse } from "axios";
import { userType } from "../types/Types";
class LoginPageService {

    login(): Promise<userType[]> {
        return new Promise((resolve: any, reject: any) => {
            axios.get("/users")
                .then((response: AxiosResponse<any, any>) => resolve(response.data))
                .catch((error: any) => reject(error));
        })
    }

}
export default new LoginPageService();