"use client";
import { DateTime } from "luxon";
import Image from "next/image";
import CategoryDeleteBtn from "./category-delete-btn";

function CategoryRow({ item }) {
	const { createdAt, name, _id, cover } = item;
	return (
		<>
			<tr>
				<td>
					{_id.substring(0, 5) +
						"..." +
						_id.substring(_id.length - 5)}
				</td>
				<td className="flex gap-2">
					<Image
						src={`/images/${cover}`}
						height={20}
						width={20}
						alt={`${name} category`}
					/>
					<span>{name}</span>
				</td>
				<td>
					{DateTime.fromISO(createdAt).toLocaleString(
						DateTime.DATETIME_SHORT
					)}
				</td>
				<td>
					<CategoryDeleteBtn id={_id} />
				</td>
			</tr>
		</>
	);
}

export default CategoryRow;
