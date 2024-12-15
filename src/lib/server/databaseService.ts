import { Databases, ID, Models, Query } from "appwrite";
import {client} from "./appwrite";
import storageService from "./storageService";
import authService from "./authService";

export type ToDoItem = Models.Document & {
    title: string;
    description: string;
    deadline: string;
    status: "ongoing" | "pending" | "rejected" | "completed" | "missed";
    userId: string;
}

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
        if(!user){
            return Error("User is required to create a user document");
        }
        const userDoc = await this.getUser(user);
        if(userDoc){
            return userDoc;
        }
        return await this.database.createDocument(this.databaseId, this.userCollectionId, ID.unique(), {
            user: user,
        });
    }

    async getUser(user: string){
        return (await this.database.listDocuments(this.databaseId, this.userCollectionId,[Query.equal("user", user)]))?.documents[0];
    }

    async getUserProfile(user: string){
        const userDoc = await this.getUser(user);
        if(!userDoc){
            const user = await authService.getUser();
            this.createUser(user.$id);
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
        const fileId = await storageService.uploadFile(coverPhoto);
        return await this.database.updateDocument(this.databaseId, this.userCollectionId, user, {
            coverPic: fileId.$id,
        })
    }

    async updateProfilePhoto(user: string, profilePhoto: File){
        const fileId = await storageService.uploadFile(profilePhoto);
        return await this.database.updateDocument(this.databaseId, this.userCollectionId, user, {
            profilePic: fileId.$id,
        })
    }

    async deleteUser(user: string){
        return await this.database.deleteDocument(this.databaseId, this.userCollectionId, user);
    }

    // to-do related functions
    async createToDoItem(userId: string, title: string, description: string, deadline: string){
        return this.database.createDocument(this.databaseId, this.toDoCollectionId, ID.unique(), {
            userId,
            title,
            description,
            deadline,
        });
    }

    async getToDoItems(userId: string, status?: "ongoing" | "pending" | "rejected" | "completed" | "missed" | "all", page: number = 1, limit: number = 10){
        const query = [Query.equal("userId", userId)];
        if(status && status !== "all"){
            query.push(Query.equal("status", status));
        }
        if(page && limit){
            query.push(Query.limit(limit));
            query.push(Query.offset((page - 1) * limit));
        }
        return this.database.listDocuments(this.databaseId, this.toDoCollectionId, query);
    }

    async getToDoItem( itemId: string){
        return this.database.getDocument(this.databaseId, this.toDoCollectionId, itemId);
    }

    async updateToDoItem(itemId: string, title: string, description: string, deadline: string){
        return this.database.updateDocument(this.databaseId, this.toDoCollectionId, itemId, {
            title,
            description,
            deadline,
        });
    }

    async deleteToDoItem(itemId: string){
        return this.database.deleteDocument(this.databaseId, this.toDoCollectionId, itemId);
    }

    async changeToDoItemStatus(itemId: string, status: "ongoing" | "pending" | "rejected" | "completed" | "missed"){
        return this.database.updateDocument(this.databaseId, this.toDoCollectionId, itemId, {
            status,
        });
    }
}

const databaseService = new Database();

export default databaseService;