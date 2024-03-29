"use client";
import { Disclosure } from "@headlessui/react";
import { VscChevronUp } from "react-icons/vsc";

function FaqList() {
	return (
		<div className="w-full px-4">
			<div className="mx-auto w-full  rounded-2xl bg-white p-2">
				<Disclosure as="div">
					{({ open }) => (
						<>
							<Disclosure.Button className="flex w-full justify-between rounded-lg bg-base-200 px-4 py-2 text-left text-sm font-medium hover:bg-base-300">
								<span>What is your refund policy?</span>
								<VscChevronUp
									className={`${
										open ? "rotate-180 transform" : ""
									} h-5 w-5`}
								/>
							</Disclosure.Button>
							<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
								If you&apos;re unhappy with your purchase for
								any reason, email us within 90 days and
								we&apos;&aposll refund you in full, no questions
								asked.
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
				<Disclosure
					as="div"
					className="mt-2"
				>
					{({ open }) => (
						<>
							<Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
								<span>Do you offer technical support?</span>
								<VscChevronUp
									className={`${
										open ? "rotate-180 transform" : ""
									} h-5 w-5 text-purple-500`}
								/>
							</Disclosure.Button>
							<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
								No.
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
		</div>
	);
}

export default FaqList;
