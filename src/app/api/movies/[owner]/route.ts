import { connectDatabase, getDocumentsByFilter } from "../../../../services/mongo";
import { MovieGetType } from "../../apiTypes";

export async function GET(request: Request, params: MovieGetType) {
    const title = params.params.title;
    const client = await connectDatabase();
    const documents = await getDocumentsByFilter(client, 'movies', { title: title });
    client.close();
    return new Response(JSON.stringify(documents), {
        headers: { 'Content-Type': 'application/json' },
    });
}

