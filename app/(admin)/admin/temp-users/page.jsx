import AddWorker from "./__components/add-worker";
import DisplayWorkers from "./__components/display-worker";

function TempUser() {
	return (
		<>
			<div className="border-b p-5 mb-10">
				<h2 className="text-xl font-bold">Workers</h2>
			</div>

			<AddWorker />
			<hr className="my-10" />
			<DisplayWorkers />
		</>
	);
}

export default TempUser;
