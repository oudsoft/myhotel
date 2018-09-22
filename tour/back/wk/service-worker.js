

self.addEventListener("push", function (event) {
  var title = (event.data && event.data.text()) || "สวัสดีเจ้าค่ะ";

  event.waitUntil(
    self.registration.showNotification(title, {
      body: "สวัสดีเจ้าค่ะ",
      icon: "../../../resources/imgs/vanOS.png",
      tag:  "push-notification-tag",
      data: {
        url: event.data.url, // This is returning null
        id: event.data.id // And this is returning null
      }
    })
  )
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
	clients.openWindow(event.notification.data.url + "?notification_id=" + event.notification.data.id)
  );
})