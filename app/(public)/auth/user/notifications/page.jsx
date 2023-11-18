import { SlTrash } from "react-icons/sl";

function UsernNotificationsPage() {
	return (
		<>
			<div className="px-10 mb-20">
				<h1 className="text-4xl font-bold">Notifications</h1>
			</div>

			<div className="px-10 mb-20">
				<ul className="space-y-2">
					<li className="bg-primary/10 p-5 rounded-xl">
						<h2 className="font-bold text-xl">
							Notification title
						</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Accusamus ipsum necessitatibus culpa dicta a
							eum et officiis incidunt, est consequatur?
						</p>
						<div className="text-right">
							<button className="btn btn-sm btn-outline btn-error btn-square">
								<SlTrash />
							</button>
						</div>
					</li>
					<li className="border p-5 rounded-xl">
						<h2 className="font-bold text-xl">
							Notification title
						</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Accusamus ipsum necessitatibus culpa dicta a
							eum et officiis incidunt, est consequatur?
						</p>
						<div className="text-right">
							<button className="btn btn-sm btn-outline btn-error btn-square">
								<SlTrash />
							</button>
						</div>
					</li>
					<li className="border p-5 rounded-xl">
						<h2 className="font-bold text-xl">
							Notification title
						</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Accusamus ipsum necessitatibus culpa dicta a
							eum et officiis incidunt, est consequatur?
						</p>
						<div className="text-right">
							<button className="btn btn-sm btn-outline btn-error btn-square">
								<SlTrash />
							</button>
						</div>
					</li>
				</ul>
			</div>
		</>
	);
}

export default UsernNotificationsPage;
