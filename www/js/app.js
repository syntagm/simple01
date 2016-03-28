function publish() {

    pubnub = PUBNUB({
        publish_key   : 'pub-c-aecc91c5-160e-411a-8773-3a22171f396a',
        subscribe_key : 'sub-c-84105db0-f4d1-11e5-8cfb-0619f8945a4f'
    })

    console.log("Subscribing..");
    pubnub.subscribe({
        channel : "Channel-ud4gp1y1y",
        message : function (message, envelope, channelOrGroup, time, channel) {
          console.log(
          "Message Received." + "\n" +
          "Channel or Group: " + JSON.stringify(channelOrGroup) + "\n" +
          "Channel: " + JSON.stringify(channel) + "\n" +
          "Message: " + JSON.stringify(message) + "\n" +
          "Time: " + time + "\n" +
          "Raw Envelope: " + JSON.stringify(envelope)
        )},
        connect: pub
    })

    function pub() {
       console.log("Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish.");
       pubnub.publish({
            channel : "Channel-ud4gp1y1y",
            message : "Hello from PubNub Channel-ud4gp1y1y!",
            callback: function(m){ console.log(m) }
       })
    }
};
