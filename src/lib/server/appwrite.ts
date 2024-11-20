import {Client} from "appwrite";

export const client = new Client();
if (!process.env.NEXT_PUBLIC_API_ENDPOINT || !process.env.NEXT_PUBLIC_PROJECT_ID) {
    throw new Error("API endpoint and project ID are required");
}

client.setEndpoint(process.env.NEXT_PUBLIC_API_ENDPOINT).setProject(process.env.NEXT_PUBLIC_PROJECT_ID);