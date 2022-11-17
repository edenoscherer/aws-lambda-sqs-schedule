import { Collection, Document, MongoClient } from 'mongodb';

export class DatabaseConnection {
    private static connection: MongoClient;

    public static async connect(url: string): Promise<void> {
        this.connection = await MongoClient.connect(url);
    }

    public static async disconnect(): Promise<void> {
        await this.connection.close();
    }

    public static getCollection<TSchema extends Document = Document>(collectionName: string): Collection<TSchema> {
        const databaseName = process.env.DB_NAME;
        const collection = this.connection.db(databaseName).collection<TSchema>(collectionName);

        return collection;
    }

    public static getConnection(): MongoClient {
        return this.connection;
    }
}
