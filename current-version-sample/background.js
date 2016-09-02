chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window.html', {
    'outerBounds': {
      'width': 400,
      'height': 500
    }
  });

  function registerCallback(registrationId) {
    console.log(registrationId);
    if (chrome.runtime.lastError) {
      // When the registration fails, handle the error and retry the
      // registration later.
      return;
    }

    // Send the registration token to your application server.
    sendRegistrationId(function(succeed) {
      // Once the registration token is received by your server,
      // set the flag such that register will not be invoked
      // next time when the app starts up.
      if (succeed)
        chrome.storage.local.set({registered: true});
    });
  }

  function sendRegistrationId(callback) {
    // Send the registration token to your application server
    // in a secure way.
  }

  chrome.storage.local.get("registered", function(result) {
    // If already registered, bail out.
    if (result["registered"])
      return;

    // Up to 100 senders are allowed.
    var senderIds = ["979397196554"];
    chrome.gcm.register(senderIds, registerCallback);
  });

  chrome.gcm.onMessage.addListener(function(obj) {
    // A message is an object with a data property that
    // consists of key-value pairs.
    console.log(obj);
    var notice = new Notification(obj.data.message);
  });

});