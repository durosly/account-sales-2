"use client";

import useRequestPermission from "@/hooks/useRequestPermission";
import { memo } from "react";

function HandleNotificationTopic({ topic }) {
	useRequestPermission({ topic });

	return null;
}

export default memo(HandleNotificationTopic);
