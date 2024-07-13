"use client";
import { useRef, useState } from "react";
import { AccountContext } from "./context";
import { handleClientError } from "@/lib/utils";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

function AccountContextWrapper({ accounts, children }) {
	const router = useRouter();
	const toastId = useRef(null);
	const [selected, setSelected] = useState([]);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isRestoring, setIsRetoring] = useState(false);

	async function deleteAccount(ids) {
		if (isDeleting) return;
		try {
			setIsDeleting(true);
			toastId.current = toast.loading("Deleting...");

			if (ids.length === 0) return toast.error("No item selected", { id: toastId.current });

			const response = await axios.delete(`/api/admin/dead-accounts`, { data: { ids } });
			if (response.data.status) {
				const newList = selected.filter((id) => !ids.includes(id));
				setSelected(newList);
				toast.success("Success", { id: toastId.current });
				router.refresh();
			} else {
				throw new Error(response.data.message);
			}
		} catch (error) {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		} finally {
			setIsDeleting(false);
		}
	}

	async function restoreAccount(ids) {
		if (isRestoring) return;
		try {
			setIsRetoring(true);
			toastId.current = toast.loading("Restoring...");

			if (ids.length === 0) return toast.error("No item selected", { id: toastId.current });

			const response = await axios.post(`/api/admin/dead-accounts`, { ids });
			if (response.data.status) {
				const newList = selected.filter((id) => !ids.includes(id));
				setSelected(newList);
				toast.success("Success", { id: toastId.current });
				router.refresh();
			} else {
				throw new Error(response.data.message);
			}
		} catch (error) {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		} finally {
			setIsRetoring(false);
		}
	}

	return <AccountContext.Provider value={{ accounts, selected, setSelected, deleteAccount, isDeleting, restoreAccount, isRestoring }}>{children}</AccountContext.Provider>;
}

export default AccountContextWrapper;
