"use client";
import truncateString from "@/utils/shared/trunc";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import { DateTime } from "luxon";
import Skeleton from "react-loading-skeleton";
// import EditServiceName from "./edit-service-name";
// import ServiceDeleteBtn from "./service-delete-btn";
// import ServiceQuantity from "./service-quantity";
// import ServiceUpdateBtn from "./service-update-btn";
import { FaRegEye } from "react-icons/fa";
import ShowDetailsBtn from "@/app/(admin)/admin/orders/__components/show-details-btn";
import { ItemContextManager } from "./item-context";
import { useContext } from "react";

function ItemRow({ item, count }) {
	const { createdAt, _id, status } = item;

	const {
		data,
		methods: { removeAccount, addAccount },
	} = useContext(ItemContextManager);

	function handleChange() {
		if (data.accounts.includes(_id)) {
			removeAccount(_id);
		} else {
			addAccount(_id);
		}
	}

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
		<tr>
			<td>
				<input
					type="checkbox"
					className="checkbox"
					checked={data.accounts.includes(_id)}
					onChange={handleChange}
				/>
			</td>
			<td>{count}</td>
			<td>{truncateString(_id, 8, "middle")}</td>
			<td className="">
				<span
					className={`badge ${
						status === "new" ? "badge-success" : "badge-error"
					} `}
				>
					{status}
				</span>
			</td>

			<td>
				{DateTime.fromISO(createdAt).toLocaleString(
					DateTime.DATETIME_SHORT
				)}
			</td>
			<td className="space-x-2 whitespace-nowrap">
				<ShowDetailsBtn
					id={_id}
					items={[item]}
				/>
			</td>
		</tr>
	);
}

export default ItemRow;
