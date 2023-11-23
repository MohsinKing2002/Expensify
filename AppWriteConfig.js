import { Account, Client, Databases, ID, Permission } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("65545fd76d3374fb899d"); // Your project ID);

const account = new Account(client);

const databases = new Databases(client);

const permission = new Permission(client);

export { client, databases, account, permission, ID };
