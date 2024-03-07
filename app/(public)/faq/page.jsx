import FaqList from "./__components/faq-list";

export const metadata = { title: "Frequently Asked Questions" };

function FAQ() {
	return (
		<>
			<div className="px-10 space-y-3 mb-10S">
				<h1 className="text-4xl font-bold">
					Frequently Asked Questions
				</h1>
				<p>
					The use of services provided by SMVaults establishes an
					agreement to these terms. By registering or using our
					services you agree that you have read and fully understood
					the following terms of Service and SMVaults will not be held
					liable for loss in any way for users who have not read the
					below terms of service.
				</p>
				<p className="uppercase font-bold text-xl">
					PLEASE READ THESE TERMS OF SERVICE CAREFULLY BEFORE USING
					THE WEBSITE If you do not agree to any or all of these Terms
					of Service, DO NOT USE THIS SITE!
				</p>
			</div>

			<FaqList />
		</>
	);
}

export default FAQ;
