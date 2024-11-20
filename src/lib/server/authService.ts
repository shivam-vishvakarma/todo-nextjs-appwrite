import { Account, ID, Models } from "appwrite";
import { client } from "./appwrite";
import databaseService from "./databaseService";

export class AuthService{
    account: Account;
    constructor(){
        this.account = new Account(client);
    }

    async signup(name: string, email: string, password: string): Promise<Models.Document>{
        let user = await this.account.create(ID.unique(), email, password, name);
        return await databaseService.createUser(user.$id);
    }

    async login(email: string, password: string): Promise<Models.Session>{
        return await this.account.createEmailPasswordSession(email, password);
    }

    async logout(){
        return await this.account.deleteSession("current");
    }

    async getUser(){
        return await this.account.get();
    }
}

export default new AuthService();