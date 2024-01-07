"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { StatisticsContext } from "../context";
import Skeleton from "react-loading-skeleton";
import { handleClientError } from "@/lib/utils";
import commaNumber from "comma-number";

function AccountStat({ type }) {
	const {
		state: { start_date, end_date, range },
	} = useContext(StatisticsContext);

	function isEnabled() {
		if (range !== "interval-range") return true;

		if (start_date && end_date) return true;

		return false;
	}

	const { isPending, isError, data, error, isFetching } = useQuery({
		queryKey: ["analytics", type, range, start_date, end_date],
		queryFn: () =>
			axios(
				`/api/admin/analytics/account?type=${type}&start=${start_date}&end=${end_date}&range=${range}`
			),
		enabled: isEnabled(),
	});

	const queryResponse = data?.data?.data || {};

	return (
		<>
			{isPending ? (
				<>
					<p className="text-3xl font-bold">
						<Skeleton />
					</p>
					<div>
						<p>
							<Skeleton />
						</p>
						<p className="text-xs">
							<Skeleton />
						</p>
					</div>
				</>
			) : isError ? (
				<p className="text-error">{handleClientError(error)}</p>
			) : (
				<>
					<p className="text-3xl font-bold">
						{commaNumber(queryResponse.total)}
					</p>
					<div>
						<p>
							$
							{commaNumber(
								Number(queryResponse.totalCostInUSD).toFixed(2)
							)}
						</p>
						<p className="text-xs">
							<span>&#8358;</span>
							{commaNumber(queryResponse.totalCost)}
						</p>
					</div>
				</>
			)}
			{isFetching ? <span className="loading loading-dots"></span> : null}
		</>
	);
}

export default AccountStat;
