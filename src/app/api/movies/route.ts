import { connectDatabase, getAllDocuments, insertDocument } from "../../../services/mongo";

export async function GET() {
    const client = await connectDatabase();
    const documents = await getAllDocuments(client, 'movies');
    client.close();
    return new Response(JSON.stringify(documents), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(request: Request) {
    const { title, date, seats, description, duration } = await request.json();
    const client = await connectDatabase();
    const result = await insertDocument(client, 'movies', { title, date, seats, description, duration });
    client.close();
    return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
    });
}
