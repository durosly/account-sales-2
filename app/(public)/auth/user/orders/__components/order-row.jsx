"use client";
import commaNumber from "comma-number";
import { DateTime } from "luxon";
import ShowDetailsBtn from "./show-details-btn";

function OrderRow({ item, count }) {
	const {
		createdAt,
		_id,
		categoryId,
		serviceId,
		serviceItemIds,
		quantity,
		charge,
		status,
		info,
	} = item;
	return (
		<>
			<tr>
				<th>{count}</th>
				<td>
					{DateTime.fromISO(createdAt).toLocaleString(
						DateTime.DATETIME_SHORT
					)}
				</td>
				<td>
					{serviceId.name}/{categoryId.name}
					<ShowDetailsBtn
						id={_id}
						details={info}
						items={serviceItemIds}
					/>
				</td>
				<td>{commaNumber(quantity)}</td>
				<td>{commaNumber(charge)}</td>
				<td>{status}</td>
			</tr>
		</>
	);
}

export default OrderRow;
