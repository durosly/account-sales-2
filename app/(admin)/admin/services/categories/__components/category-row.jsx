"use client";
import { DateTime } from "luxon";
import Image from "next/image";
import CategoryDeleteBtn from "./category-delete-btn";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";

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
				<td className="whitespace-nowrap space-x-2">
					<Image
						src={`/images/${cover}`}
						height={20}
						width={20}
						alt={`${name} category`}
						className="inline-block"
					/>
					<span className="inline-block">{name}</span>
				</td>
				<td>
					<Link
						href={`/admin/services/categories/${_id}`}
						className="btn btn-xs btn-primary btn-outline"
					>
						<FaRegEye className="w-5 h-5" />
						sub categories
					</Link>
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
