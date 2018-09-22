const publicVapidKey = 'BEnsYoG6bRxsANq2a52QCiS6xEFBCpPH6fRfxv-GKZrHIc6d-ptPMqyXWAf91EKVSeDv5PzgPjCgbQoPscVutyU';


if ('serviceWorker' in navigator) {
	console.log('Registering service worker');

	run().catch(error => console.error(error));
}

async function run() {
	console.log('Registering service worker');
	const registration = await navigator.serviceWorker.register('worker.js');

	console.log('Registering push');

	const subscription = await registration.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
		/* applicationServerKey: urlBase64ToUint8Array(publicGCMKey) */
	});
	console.log('Registered push');
	//console.log("subscription ::=> " + JSON.stringify(subscription));
	var yourendpoint = document.getElementById('your-endpont');
	yourendpoint.innerHTML = JSON.stringify(subscription);

}

// Boilerplate borrowed from https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function myFunction() {
 /* Get the text field */
  var copyText = document.getElementById("your-endpont");
  /* Select the text field */
  copyText.select();
  /* Copy the text inside the text field */
  document.execCommand("copy");
  /* Alert the copied text */
  alert("คัดลอก endpoint ของคุณพี่ไปไว้ที่คลิปบอร์ดแล้วเจ้าค่ะ");
}