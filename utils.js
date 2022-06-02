const notifier = require('node-notifier');

module.exports = {
  notify: function(title, message) {
    notifier.notify({
        title: title,
        message: message,
        icon: "C:/Users/pix3l/OneDrive/Desktop/command-center/heads-terminal.png",
        sound: true, // Only Notification Center or Windows Toasters
        wait: false // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
      },
      function(err, response, metadata) {
        // Response is response from notification
        // Metadata contains activationType, activationAt, deliveredAt
      }
    );

  }
}