"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
export const queryClient = new QueryClient();
function ClientWrapper({ children }) {
	return (
		// Provide the client to your App
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
}

export default ClientWrapper;
