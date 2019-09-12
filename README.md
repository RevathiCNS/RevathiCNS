#GCP_NodeJS_POC
#Creating CloudFunction to publish and pull messages from PubSub Topic.

Created a Cloud function with HTTP trigger and NodeJS8 as runtime.
This is the trigger URL : https://us-central1-civil-envoy-250608.cloudfunctions.net/function-1

In the inline editor, first a topic has been created using PubSub dependency.
Then a message ( [{"Message" : "Hellooo World!!!"}] ) is published in to the topic created( topic1 )
A subscription with SubcriptionName 'sub1' has been created from the console.
Console--> Cloud PubSub-->Subscriptions-->Create new Subscription


