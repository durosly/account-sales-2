import { Types } from "mongoose";

function isValidObjectId(id) {
	const { ObjectId } = Types;

	if (ObjectId.isValid(id)) {
		if (String(new ObjectId(id)) === id) return true;
		return false;
	}
	return false;
}

export default isValidObjectId;
