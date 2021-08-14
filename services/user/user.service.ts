import BasicService from "../basic.service";
import Config from "../../config/config.json";

export class UserService extends BasicService {

    static async login(login: string, password: string) {
        return BasicService.postData(Config.Authentification.Login, {
            username: login,
            password: password
        }, 'POST');
    }

    static async getUserById(userId: string){
        return BasicService.fetchData(Config.Authentification.UserInfos, {
            userid: userId
        })
    }
}