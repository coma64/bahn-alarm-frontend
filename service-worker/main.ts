/// <reference types="../node_modules/types-serviceworker" />

self.addEventListener('push', (event) => {
	if (!event.data) return;

	const data = event.data.json();
	if (data?.type === 'connection-delay') {
		event.waitUntil(
			self.registration.showNotification('Bahn Alaaaarm', {
				body: data.message,
				vibrate: [500, 100, 500],
				actions: [
					{
						title: 'Open',
						action: `openConnection-${data.connection_id}`,
					},
				],
			}),
		);
	}
});

self.addEventListener(
	'notificationclick',
	(event) => {
		event.notification.close();

		if (event.action.startsWith('openConnection-')) {
			const connectionId = event.action.split('-')[1];
			clients.openWindow(`/dashboard/edit/${connectionId}`);
		}
	},
	false,
);
