"use client";
import commaNumber from "comma-number";
import { DateTime } from "luxon";
import ShowDetailsBtn from "./show-details-btn";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

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

	// Load currency rate
	const {
		isPending: isPendingRate,

		data: rate,
	} = useQuery({
		queryKey: ["rate"],
		queryFn: () => axios(`/api/rates`),
	});

	const rateResponse = rate?.data?.data || {};

	return (
		<>
			<tr>
				<th>{count}</th>
				<td>{_id}</td>
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
				<td>
					${" "}
					{isPendingRate ? (
						<Skeleton className="w-10" />
					) : (
						<>
							{commaNumber(
								Number(
									charge / (rateResponse?.amount || 1)
								).toFixed(2)
							)}
						</>
					)}
				</td>
				<td>{status}</td>
			</tr>
		</>
	);
}

export default OrderRow;
