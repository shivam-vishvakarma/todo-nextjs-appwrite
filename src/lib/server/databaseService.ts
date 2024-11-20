import { Databases, ID, Query } from "appwrite";
import {client} from "./appwrite";
import storageService from "./storageService";

export class Database{
    database: Databases;
    databaseId: string;
    toDoCollectionId: string;
    userCollectionId: string;
    constructor(){
        this.database = new Databases(client);
        if(!process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID){
            throw new Error("APPWRITE_DATABASE_ID is not set in .env file")
        }
        this.databaseId = String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID);
        if(!process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_TO_DO){
            throw new Error("APPWRITE_COLLECTION_ID_TO_DO is not set in .env file")
        }
        this.toDoCollectionId = String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_TO_DO);
        if(!process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_USER){
            throw new Error("APPWRITE_COLLECTION_ID_USER is not set in .env file")
        }
        this.userCollectionId = String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_USER);
    }
    // user related functions

    async createUser(user: string){
        return await this.database.createDocument(this.databaseId, this.userCollectionId, ID.unique(), {
            user: user,
        });
    }

    async getUser(user: string){
        return await this.database.listDocuments(this.databaseId, this.userCollectionId,[Query.equal("user", user)]);
    }

    async getUserProfile(user: string){
        let userDoc = (await this.getUser(user))?.documents[0];
        if(!userDoc){
            userDoc = await this.createUser(user);
        }
        if(userDoc?.coverPic){
            userDoc.coverPic = storageService.getFile(userDoc.coverPic);
        }
        if(userDoc?.profilePic){
            userDoc.profilePic = storageService.getFile(userDoc.profilePic);
        }
        return userDoc;
    }

    async updateUser(user: string, first_name: string, last_name: string, gender: string, dob: string){
        return await this.database.updateDocument(this.databaseId, this.userCollectionId, user, {
            first_name: first_name,
            last_name: last_name,
            dob: dob,
            gender: gender,
        })
    }

    async updateCoverPhoto(user: string, coverPhoto: File){
        const fileId = await storageService.uploadFile(coverPhoto, user);
        return await this.database.updateDocument(this.databaseId, this.userCollectionId, user, {
            coverPic: fileId,
        })
    }

    async updateProfilePhoto(user: string, profilePhoto: File){
        const fileId = await storageService.uploadFile(profilePhoto, user);
        return await this.database.updateDocument(this.databaseId, this.userCollectionId, user, {
            profilePic: fileId,
        })
    }

    async deleteUser(user: string){
        return await this.database.deleteDocument(this.databaseId, this.userCollectionId, user);
    }

    // to-do related functions
    async createToDoItem(userId: string, title: string, description: string){
        return this.database.createDocument(this.databaseId, this.toDoCollectionId, ID.unique(), {
            userId,
            title,
            description,
        });
    }

    async getToDoItems(userId: string){}
    async getToDoItem(userId: string, itemId: string){}
}

export default new Database();