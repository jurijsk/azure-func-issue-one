import { HttpRequest, HttpResponseInit, InvocationContext, app } from "@azure/functions";
import { BlobServiceClient } from '@azure/storage-blob';

app.http('test', {
    methods: ['GET', "POST"],
    authLevel: 'anonymous',
    handler: test
});

export async function test(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
	let bsc = BlobServiceClient; //just to await tree-shaking by tsc
    return {
        status: 200,
        jsonBody: { 
            'version': 1,
            'message': 'i hope this works',
        }
    };
}
