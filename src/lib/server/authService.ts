import { Account, ID, Models } from "appwrite";
import { client } from "./appwrite";

export class AuthService{
    account: Account;
    constructor(){
        this.account = new Account(client);
    }

    async signup(name: string, email: string, password: string): Promise<Models.User<Models.Preferences>>{
        return await this.account.create(ID.unique(), email, password, name);
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

    async updateEmail(email: string, password: string){
        return await this.account.updateEmail(email, password);
    }

    async updatePassword(password: string, oldPassword: string){
        return await this.account.updatePassword(password, oldPassword);
    }

    async createEmailVerification(){
        return await this.account.createVerification(`http://${window?.location?.host}/verify-email`);
    }

    async verifyEmail(userId: string, secret: string){
        return await this.account.updateVerification(userId, secret);
    }

    async updatePhone(phone: string, password: string){
        return await this.account.updatePhone(phone, password);
    }

    async createPhoneVerification(){
        return await this.account.createPhoneVerification();
    }

    async verifyPhone(userId: string, secret: string){
        return await this.account.updatePhoneVerification(userId, secret);
    }
}

export default new AuthService();