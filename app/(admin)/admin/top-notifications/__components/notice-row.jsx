"use client";
import commaNumber from "comma-number";
import { DateTime } from "luxon";
import { LuTrash } from "react-icons/lu";
import truncateString from "@/utils/shared/trunc";
import ActiveBtn from "./active-btn";
import ViewBtn from "./view-btn";
import NoticeDeleteBtn from "./delete-btn";

function NoticeRow({ item }) {
	const { createdAt, _id, status, body } = item;
	return (
		<>
			<tr>
				<td className="font-bold">
					{truncateString(_id, 10, "middle")}
				</td>
				<td>{truncateString(body, 20, "middle")}</td>
				<td>
					<span
						className={`badge ${
							status === "inactive"
								? "badge-error"
								: "badge-success"
						}`}
					>
						{status}
					</span>
				</td>

				<td className="space-x-3">
					<ActiveBtn
						id={_id}
						status={status}
					/>
					<ViewBtn
						id={_id}
						body={body}
					/>
					<NoticeDeleteBtn id={_id} />
				</td>
				<td>
					{DateTime.fromISO(createdAt).toLocaleString(
						DateTime.DATETIME_SHORT
					)}
				</td>
			</tr>
		</>
	);
}

export default NoticeRow;
