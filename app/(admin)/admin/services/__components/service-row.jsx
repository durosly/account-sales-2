"use client";
import { DateTime } from "luxon";
import ServiceDeleteBtn from "./service-delete-btn";
import ServiceUpdateBtn from "./service-update-btn";
import commaNumber from "comma-number";
import ServiceQuantity from "./service-quantity";
import Image from "next/image";
import global from "@/images/global.png";

function ServiceRow({ item }) {
	const { createdAt, name, _id, categoryId, price, country } = item;

	console.log(country);

	return (
		<tr>
			<td>
				{_id.substring(0, 2) + "..." + _id.substring(_id.length - 2)}
			</td>
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
			</td>
			<td>
				<ServiceQuantity id={_id} />
			</td>
			<td>{categoryId?.name || "nil"}</td>
			<td>{commaNumber(price)}</td>
			<td>
				{DateTime.fromISO(createdAt).toLocaleString(
					DateTime.DATETIME_SHORT
				)}
			</td>
			<td className="space-x-2 whitespace-nowrap">
				<ServiceUpdateBtn id={_id} />
				<ServiceDeleteBtn id={_id} />
			</td>
		</tr>
	);
}

export default ServiceRow;
