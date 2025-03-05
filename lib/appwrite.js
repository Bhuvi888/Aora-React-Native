import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
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
const storage = new Storage(client)

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
    if(!session) throw Error
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

export async function uploadFile(file, type) {
  if (!file) return;

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      config.storageBucketId,
      ID.unique(),
      asset
    );
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload file. Please try again later.");
  }
}

export async function getFilePreview(fileId,type) {

  let fileUrl;

  if(type==='video'){
   fileUrl = storage.getFileView(
    config.storageBucketId,fileId
   )
  }else if(type === 'image'){
   fileUrl = storage.getFilePreview(
    config.storageBucketId,
    fileId,
    2000,
    2000,
    "top",
    1000
   )
   

  }else{
      throw new Error("Invalid file Type");
  }
  
  if(!fileUrl) throw Error
  return fileUrl

}
export async function createVideo (form) {
  try {
    const [ thumbnailUrl , videoUrl] = await Promise.all([
      uploadFile(form.thumbnail,'image'),
      uploadFile(form.video,'video')
    ])

    const newPost = await database.createDocument(
      config.databaseId,
      config.videocollectionsId,
      ID.unique(),
      {
        title:form.title,
        video:form.video,
        thumbnail:form.thumbnail,
        prompt:form.prompt,
      }
    )
    return newPost;
  } catch (error) {
    throw new Error(error)
  }
}