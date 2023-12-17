"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import { DateTime } from "luxon";
import Skeleton from "react-loading-skeleton";
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

	// Load currency rate
	const {
		isPending: isPendingRate,
		isError,
		data: rate,
		error,
	} = useQuery({
		queryKey: ["rate"],
		queryFn: () => axios(`/api/rates`),
	});

	const rateResponse = rate?.data?.data || {};

	return (
		<>
			<tr>
				<th>{count}</th>
				<td className="flex flex-wrap gap-2">
					<ShowDetailsBtn
						id={_id}
						details={info}
						items={serviceItemIds}
					/>
				</td>
				<td className="italic">{_id}</td>
				<td>
					{DateTime.fromISO(createdAt).toLocaleString(
						DateTime.DATETIME_SHORT
					)}
				</td>
				<td>
					{serviceId?.name}/{categoryId?.name}
				</td>

				<td>{commaNumber(quantity)}</td>
				<td>
					&#8358; {commaNumber(charge)} / ${" "}
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
