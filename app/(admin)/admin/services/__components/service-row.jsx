"use client";
import { DateTime } from "luxon";
import ServiceDeleteBtn from "./service-delete-btn";

function ServiceRow({ item }) {
	const { createdAt, name, _id, categoryId } = item;

	return (
		<tr>
			<td>
				{_id.substring(0, 5) + "..." + _id.substring(_id.length - 5)}
			</td>
			<td>{name}</td>
			<td>{categoryId?.name || "nil"}</td>
			<td>
				{DateTime.fromISO(createdAt).toLocaleString(
					DateTime.DATETIME_SHORT
				)}
			</td>
			<td>
				<ServiceDeleteBtn id={_id} />
			</td>
		</tr>
	);
}

export default ServiceRow;
