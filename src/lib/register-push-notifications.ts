import { ENVIRONMENT } from '$lib/environment';
import { get } from 'svelte/store';
import { authHeaders } from '$lib/stores/auth';
import { user } from '$lib/stores/user';

let ranOnce = false;
export const registerPushNotifications = async () => {
	if (ranOnce) return;
	ranOnce = true;

	const registration = await navigator.serviceWorker.ready;
	if (await registration.pushManager.getSubscription()) return;

	const vapidKeyResponse = await fetch(`${ENVIRONMENT.API_PATH}/authentication/vapid-key`);
	const subscription = await registration.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: (await vapidKeyResponse.json()).key,
	});

	if (!get(user)) {
		console.log('User not logged in yet, unable to send push notification subscription to backend');
		return;
	}

	await fetch(`${ENVIRONMENT.API_PATH}/authentication/register-push-notifications`, {
		method: 'post',
		headers: {
			...get(authHeaders),
			'content-type': 'application/json',
		},
		body: JSON.stringify(subscription.toJSON()),
	});
};
