# The issue

For some reason Azure Function App startup / host thingything fails to discover and load job functions.

```
2023-05-01T15:33:29.009 [Information] Reading functions metadata
2023-05-01T15:33:29.009 [Information] 1 functions found //>>should be 2 functions
2023-05-01T15:33:29.009 [Debug] Handling WorkerErrorEvent for runtime:node, workerId:node. Failed with: System.TimeoutException: The operation has timed out.
   at Microsoft.Azure.WebJobs.Script.Grpc.GrpcWorkerChannel.PendingItem.OnTimeout() in /_/src/WebJobs.Script.Grpc/Channel/GrpcWorkerChannel.cs:line 1452
--- End of stack trace from previous location ---
   at Microsoft.Azure.WebJobs.Script.Grpc.GrpcWorkerChannel.StartWorkerProcessAsync(CancellationToken cancellationToken) in /_/src/WebJobs.Script.Grpc/Channel/GrpcWorkerChannel.cs:line 275
2023-05-01T15:33:29.010 [Debug] Attempting to dispose webhost or jobhost channel for workerId: 'cd1291e8-c713-4747-9a1d-63083beb9e31', runtime: 'node'
2023-05-01T15:33:29.010 [Debug] Did not find WebHost or JobHost channel to dispose for workerId: 'cd1291e8-c713-4747-9a1d-63083beb9e31', runtime: 'node'
2023-05-01T15:33:29.010 [Debug] Skipping worker channel restart for errored worker runtime: 'node', current runtime: 'node', isWebHostChannel: 'False', isJobHostChannel: 'False'
2023-05-01T15:33:29.013 [Information] 0 functions loaded
2023-05-01T15:33:29.017 [Debug] Adding Function descriptor provider for language node.
2023-05-01T15:33:29.018 [Debug] Creating function descriptors.
2023-05-01T15:33:29.018 [Debug] Function descriptors created.
2023-05-01T15:33:29.018 [Debug] Placeholder mode is enabled: False
2023-05-01T15:33:29.019 [Debug] RpcFunctionInvocationDispatcher received no functions
2023-05-01T15:33:29.019 [Information] Generating 0 job function(s) //>>wat?
2023-05-01T15:33:29.026 [Warning] No job functions found. Try making your job classes and methods public. If you're using binding extensions (e.g. Azure Storage, ServiceBus, Timers, etc.) make sure you've called the registration method for the extension(s) in your startup code (e.g. builder.AddAzureStorage(), builder.AddServiceBus(), builder.AddTimers(), etc.).

```

This only happens when I add certain imports to the function code, but is is not consistant as well. Most often I can reproduce this with `@azure/functions`. But again this can work of the first time, and stop working after a while, and I can not find a way to get it going again. I've tried funcition stop/start. killing processes in explorer in Kudu.

Judging by the error log someting times out. How to see that gaused in, and hoe to make it stop timing out?

I gather that Azure Infrastructure should run my function files to get meta and build routing and know what to run when. Can I at least get any logs from node to see that breaks?

## Context

* I have to run it from filesystem, not from package. I will need to use *.exe utility to access files and write back to the file. So I've removed `WEBSITE_RUN_FROM_PACKAGE`





Link:

[WebJobs.Script/Workers/Rpc/FunctionRegistration/RpcFunctionInvocationDispatcher.cs](https://github.com/Azure/azure-functions-host/blob/dev/src/WebJobs.Script/Workers/Rpc/FunctionRegistration/RpcFunctionInvocationDispatcher.cs)



# Deploy

func azure functionapp publish azure-func-issue-one --nozip
