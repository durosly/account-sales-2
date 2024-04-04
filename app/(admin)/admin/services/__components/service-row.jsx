"use client";
import global from "@/images/global.png";
import truncateString from "@/utils/shared/trunc";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import EditServiceName from "./edit-service-name";
import ServiceDeleteBtn from "./service-delete-btn";
import ServiceQuantity from "./service-quantity";
import ServiceUpdateBtn from "./service-update-btn";
import { FaRegEye } from "react-icons/fa";
import ServiceTogglePreviewBtn from "./toggle-preview";

function ServiceRow({ item }) {
	const {
		createdAt,
		name,
		_id,
		categoryId,
		price,
		country,
		subCategoryId,
		details,
		showPreview,
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
		<tr>
			<td>{truncateString(_id, 8, "middle")}</td>
			<td className="">
				{country === "global" ? (
					<Image
						src={global}
						width={20}
						height={20}
						className="inline-block"
					/>
				) : (
					<span className={`fi fi-${country.toLowerCase()}`}></span>
				)}
				<span className="ml-1">{name}</span>
				<EditServiceName id={_id} />
			</td>
			<td>
				<ServiceQuantity id={_id} />
			</td>

			<td>
				{isPendingRate ? (
					<Skeleton className="w-10" />
				) : (
					<>
						{commaNumber(
							Number(price / (rateResponse?.amount || 1)).toFixed(
								2
							)
						)}
					</>
				)}
			</td>
			<td>
				{DateTime.fromISO(createdAt).toLocaleString(
					DateTime.DATETIME_SHORT
				)}
			</td>
			<td className="space-x-2 whitespace-nowrap">
				<ServiceUpdateBtn
					id={_id}
					data={{ details }}
				/>
				<ServiceDeleteBtn id={_id} />
				<ServiceTogglePreviewBtn
					id={_id}
					previewStatus={showPreview}
				/>
				<Link
					className="btn btn-sm md:btn-md btn-primary btn-square btn-outline"
					href={`/admin/services/${_id}/items`}
				>
					<FaRegEye />
				</Link>
			</td>
		</tr>
	);
}

export default ServiceRow;
