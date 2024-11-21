import { ID, Storage } from "appwrite";
import { client } from "./appwrite";

class StorageService{
    storage: Storage;
    userMediaBucketId: string;
    constructor(){
        this.storage = new Storage(client);
        if(!process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID_USER_MEDIA){
            console.log("process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID_USER_MEDIA", process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID_USER_MEDIA);
            
            throw new Error("APPWRITE_STORAGE_ID_USER_MEDIA is not set in .env file")
        }
        this.userMediaBucketId = String(process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID_USER_MEDIA);
    }

    async uploadFile(file: File, user: string){
        return await this.storage.createFile(this.userMediaBucketId, ID.unique(), file);
    }

    getFile(fileId: string){
        return this.storage.getFileView(this.userMediaBucketId, fileId);
    }

    downloadFile(fileId: string){
        return this.storage.getFileDownload(this.userMediaBucketId, fileId);
    }

    async deleteFile(fileId: string){
        return await this.storage.deleteFile(this.userMediaBucketId, fileId);
    }
}

export default new StorageService();