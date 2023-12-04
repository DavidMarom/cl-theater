import { connectDatabase, updateDocument,insertDocument } from "../../../services/mongo";

export async function PUT(request: Request) {
    const body = await request.json();
    const newBody = { 
        title: body.title,
        description: body.description,
        duration: body.duration,
        date: body.date,
    }
    const client = await connectDatabase();
    const documents = await updateDocument(client, 'movies', body._id, { $set: newBody });
    client.close();
    return new Response(JSON.stringify(documents), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    const newBody = { 
        title: body.title,
        description: body.description,
        duration: body.duration,
        date: body.date,
    }
    const client = await connectDatabase();
    const documents = await insertDocument(client, 'movies', newBody);
    client.close();
    return new Response(JSON.stringify(documents), {
        headers: { 'Content-Type': 'application/json' },
    });
}