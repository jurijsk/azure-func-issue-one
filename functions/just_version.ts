import { HttpRequest, HttpResponseInit, InvocationContext, app } from "@azure/functions";

app.http('v', {
    methods: ['GET', "POST"],
    authLevel: 'anonymous',
    handler: v_func
});


export async function v_func(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    return {
        status: 200,
        jsonBody: { 
            'version': 1,
            'message': 'this function does not have any imports',
        }
    };
}
