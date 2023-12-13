"use client";
import truncateString from "@/utils/shared/trunc";
import { DateTime } from "luxon";
import CategoryDeleteBtn from "./category-delete-btn";

function CategoryRow({ item, cId }) {
	const { createdAt, name, _id } = item;
	return (
		<tr>
			<td>{truncateString(_id, 13, "middle")}</td>
			<td className="whitespace-nowrap space-x-2">
				<span className="inline-block">{name}</span>
			</td>

			<td>
				{DateTime.fromISO(createdAt).toLocaleString(
					DateTime.DATETIME_SHORT
				)}
			</td>
			<td>
				<CategoryDeleteBtn
					id={_id}
					cId={cId}
				/>
			</td>
		</tr>
	);
}

export default CategoryRow;
