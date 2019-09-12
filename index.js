/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const PubSub = require(`@google-cloud/pubsub`);

exports.helloWorld = (req, res) => {
  let message = req.query.message || req.body.message || 'Hello World!';
  res.status(200).send(message);
  
  const pubsub = new PubSub();
  
//Uncomment the below code to create a new topic.
//Comment it again once the topic gets created...to avoid errors.
  
/*pubsub
    .createTopic('topic1')
    .catch(err => {
      console.error('ERROR:', err);
    });
*/
  
const data1 = [{"Message" : "Hellooo World!!!"}];
const data = JSON.stringify(data1);
const dataBuffer = Buffer.from(data);
const topicName = 'topic1';
  
pubsub
    .topic(topicName)
    .publisher()
    .publish(dataBuffer)
    .then(messageId => {
      console.log(`Message ${messageId} published.`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  
 /*--------------------------------------------------------------------*/
  
  const subscriptionName = 'sub1';
  const timeout = 60;
  
  const subscription = pubsub.subscription(subscriptionName);
  
  let messageCount = 0;
  
 /*
   Handler for received message.
   @param {Object} message
 */
  
  const messageHandler = message => {
    console.log(`Received message ${message.id}:`);
    console.log(`Data: ${message.data}`);
    console.log(`tAttributes: ${message.attributes}`);
    messageCount += 1;
  
    // Ack the messae
    message.ack();
  };
  
  // Listen for new messages until timeout is hit
 
  subscription.on(`message`, messageHandler);
  setTimeout(() => {
    subscription.removeListener('message', messageHandler);
    console.log(`${messageCount} message(s) received.`);
  }, timeout * 1000);
  
};
