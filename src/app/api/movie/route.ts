import { ObjectId } from "mongodb";
import { connectDatabase, updateDocument, getDocumentsByFilter } from "../../../services/mongo";

export async function PUT(request: Request) {
    const body = await request.json();
    const newBody = { title: body.title }
    const client = await connectDatabase();

    const documents = await updateDocument(client, 'movies', body._id, { $set: newBody });
    client.close();
    return new Response(JSON.stringify(documents), {
        headers: { 'Content-Type': 'application/json' },
    });
}