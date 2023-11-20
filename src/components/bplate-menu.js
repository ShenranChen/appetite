import { connectToCluster } from "../index.js";

export async function queryData() {
    const uri = process.env.MONGO_URI;
    let mongoClient;

    try {
      console.log(uri)
      mongoClient = await connectToCluster(uri);
    } catch (error) {
      console.log("mongoClient error: " + error);
    } finally {
        await mongoClient.close()
    }
}

const BplateMenu = () => {
};

export default BplateMenu;
