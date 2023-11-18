"use client";
import { DateTime } from "luxon";
import CategoryDeleteBtn from "./category-delete-btn";

function CategoryRow({ item }) {
	const { createdAt, name, _id } = item;
	return (
		<>
			<tr>
				<td>
					{_id.substring(0, 5) +
						"..." +
						_id.substring(_id.length - 5)}
				</td>
				<td>{name}</td>
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
