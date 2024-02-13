"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import Skeleton from "react-loading-skeleton";
import EditUserBalance from "./edit-user-balance";

function UserRow({ item, count }) {
	const { _id, name, email, is_verified, balance } = item;

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
					<div className="flex gap-2 items-center">
						<span
							className={`badge badge-xs ${
								is_verified ? "badge-success" : "badge-warning"
							}`}
						></span>
						<p>{email}</p>
					</div>
				</td>
				<td>{name}</td>
				<td>
					<div>
						<span className="whitespace-nowrap">
							${" "}
							{isPendingRate ? (
								<Skeleton className="w-10" />
							) : (
								<>
									{commaNumber(
										Number(
											balance /
												(rateResponse?.amount || 1)
										).toFixed(2)
									)}
								</>
							)}
						</span>
						{!isPendingRate && <EditUserBalance id={_id} />}
					</div>
				</td>
			</tr>
		</>
	);
}

export default UserRow;
