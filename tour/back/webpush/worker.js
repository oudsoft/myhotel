console.log('Loaded service worker!');

self.addEventListener('push', ev => {
  const data = ev.data.json();
  //console.log('Got push', data);
  console.log(data.title);
  console.log(data.body);
  console.log(data.url);
  self.registration.showNotification(data.title, {
    /* body: 'Hello, World!', */
	body: data.body,
	url: "https://myhotel-4746f.firebaseapp.com/tour/front/front.html",
    icon: 'https://myhotel-4746f.firebaseapp.com/resources/imgs/vanOS.png'
  });
});

self.addEventListener('notificationclick', function(e) {
    alert('On notification click: ');  
    e.notification.close();
    var redirectUrl = e.notification.data.redirect_url.toString();
    var scopeUrl = e.notification.data.scope_url.toString();
    console.log(redirectUrl);
    console.log(scopeUrl);

    e.waitUntil(
        clients.matchAll({type: 'window'}).then(function(clients) {
            for (i = 0; i < clients.length; i++) {
                  console.log(clients[i].url);
                  if (clients[i].url.toString().indexOf(scopeUrl) !== -1) {
                        // Scope url is the part of main url
                        clients[i].navigate(givenUrl);
                        clients[i].focus();
                        break;
                  }
            }
        })
    );
});