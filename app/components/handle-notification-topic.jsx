"use client";

import useRequestPermission from "@/hooks/useRequestPermission";

function HandleNotificationTopic({ topic }) {
	useRequestPermission({ topic });

	return null;
}

export default HandleNotificationTopic;
