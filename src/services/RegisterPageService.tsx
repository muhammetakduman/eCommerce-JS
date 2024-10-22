import axios from '../config/AxiosConfig'
import { userType } from '../types/Types'
import { AxiosResponse } from "axios";
class RegisterPageService {
    register(newUser: userType) {
        return new Promise((resolve: any, reject: any) => {
            axios.post("/users", newUser)
                .then((response: AxiosResponse<any, any>) =>
                    resolve(response.data))
                .catch((error: any) => reject(error))
        })
    }

}
export default new RegisterPageService();