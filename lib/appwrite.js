import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.bhxvi.aura",
  projectId: "6784c0d0000bee2ae698",
  databaseId: "6784e09f0001a735187f",
  usercollectionsId: "6784e11e000f2192bdfb",
  videocollectionsId: "6784e12b0020b272c464",
  storageBucketId: "6784e2a20026efe57e83",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client);

export const createuser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;

    const avatarurl = avatar.getInitials(username);

    await signin(email, password);

    const newUser = await database.createDocument(
      config.databaseId,
      config.usercollectionsId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarurl,
      }
    );
    if (!newUser) throw Error;

    return newUser;
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};
export const signin = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await database.listDocuments(
      config.databaseId,
      config.usercollectionsId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function signOut() {
  try{
     const res = await account.deleteSession("current")

     return res;
  }catch(e){
    throw new Error(e)
  }
}

export const getAllPosts = async () => {
  try {
    const post = await database.listDocuments(
      config.databaseId,
      config.videocollectionsId
    );

    return post.documents;
  } catch (error) {
    console.log(error);
  }
};
export async function getLatestPosts() {
  try {
    const posts = await database.listDocuments(
      config.databaseId,
      config.videocollectionsId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
export async function searchPosts(query) {
  try {
    const posts = await database.listDocuments(
      config.databaseId,
      config.videocollectionsId,
      [Query.search("title", query)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getCurrentUserPosts(userId) {
  try {
    const posts = await database.listDocuments(
      config.databaseId,
      config.videocollectionsId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

