import { ObjectId } from "mongodb";
import { connectDatabase, getAllDocuments, updateDocument, getDocumentsByFilter, deleteDocument } from "../../../services/mongo";

export async function GET() {
    const client = await connectDatabase();
    const documents = await getAllDocuments(client, 'movies');
    client.close();
    return new Response(JSON.stringify(documents), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function PUT(request: Request) {
    const body = await request.json();
    const newBody = { seats: body.seats }
    const client = await connectDatabase();
    const requestedSeat = body.requestedSeat;

    // check if the seat is available
    const movie = await getDocumentsByFilter(client, 'movies', { _id: new ObjectId(body._id) });
    const isAlreadyTaken = movie[0].seats.hasOwnProperty(requestedSeat);

    if (isAlreadyTaken) {
        client.close();
        return new Response(JSON.stringify({ message: 'Seat already taken' }), {
            status: 409,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // if not taken, update the document
    const documents = await updateDocument(client, 'movies', body._id, { $set: newBody });
    client.close();
    return new Response(JSON.stringify(documents), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function DELETE(request: Request) {
    const body = await request.json();
    const client = await connectDatabase();
    const documents = await deleteDocument(client, 'movies', body._id);
    client.close();
    return new Response(JSON.stringify(documents), {
        headers: { 'Content-Type': 'application/json' },
    });
}