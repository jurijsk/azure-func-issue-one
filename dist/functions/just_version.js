import { app } from "@azure/functions";
app.http('just_version', {
    methods: ['GET', "POST"],
    authLevel: 'anonymous',
    handler: just_version
});
export async function just_version(request, context) {
    return {
        status: 200,
        jsonBody: {
            'version': 1,
            'message': 'this function does not have any imports',
        }
    };
}
