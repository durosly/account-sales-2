"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { StatisticsContext } from "../context";
import Skeleton from "react-loading-skeleton";
import { handleClientError } from "@/lib/utils";
import commaNumber from "comma-number";

function ServiceStat({ serviceId, type }) {
	const {
		state: { start_date, end_date, range },
	} = useContext(StatisticsContext);

	function isEnabled() {
		if (range !== "interval-range") return true;

		if (start_date && end_date) return true;

		return false;
	}

	const { isPending, isError, data, error, isFetching } = useQuery({
		queryKey: ["analytics", "service", type, range, start_date, end_date],
		queryFn: () =>
			axios(
				`/api/admin/analytics/service/${serviceId}?type=${type}&start=${start_date}&end=${end_date}&range=${range}`
			),
		enabled: isEnabled(),
	});

	const queryResponse = data?.data?.data || {};

	return (
		<>
			{isPending ? (
				<div className="">
					<h2>
						<Skeleton />
					</h2>
					<p>
						<Skeleton />
					</p>
				</div>
			) : isError ? (
				<p className="text-error">{handleClientError(error)}</p>
			) : (
				queryResponse && (
					<div className="">
						<h2>{type === "sold" ? "🚀 Sold" : "📈 Available"}</h2>
						<p className="text-xs">
							<span>Total: </span>
							<span>{queryResponse.total}</span>
						</p>
						<p className="text-xs">
							$
							{commaNumber(
								Number(queryResponse.totalCostInUSD).toFixed(2)
							)}
						</p>
						<p className="text-xs">
							&#8358;
							{commaNumber(
								Number(queryResponse.totalCost).toFixed(2)
							)}
						</p>
					</div>
				)
			)}
		</>
	);
}

export default ServiceStat;
