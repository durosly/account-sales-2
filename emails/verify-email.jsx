import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Section,
	Text,
} from "@react-email/components";

const baseUrl = process.env.NEXT_PUBLIC_URL
	? `https://${process.env.NEXT_PUBLIC_URL}`
	: "";

export const VerifyEmail = ({ email, validationCode = "tt226-5398x" }) => (
	<Html>
		<Head />
		<Preview>Your E-mail verification code</Preview>
		<Body style={main}>
			<Container style={container}>
				<Heading style={title}>smvaults.com</Heading>
				<Heading style={heading}>Your E-mail verification code</Heading>
				<Section style={buttonContainer}>
					<Button
						style={button}
						href={`${process.env.NEXT_PUBLIC_URL}/email-verification/${email}/${validationCode}`}
					>
						Verify
					</Button>
				</Section>
				<Text style={paragraph}>
					This link and code will only be valid for the next 5
					minutes. If the link does not work, you can use the login
					verification code directly:
				</Text>
				<code style={code}>{validationCode}</code>
				<Hr style={hr} />
				<Link
					href="https://smvaults.com"
					style={reportLink}
				>
					smvaults.com
				</Link>
			</Container>
		</Body>
	</Html>
);

export default VerifyEmail;

const title = {
	fontSize: "32px",
	fontWeight: "bold",
	textAlign: "center",
};

const logo = {
	borderRadius: 21,
	width: 42,
	height: 42,
};

const main = {
	backgroundColor: "#ffffff",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: "0 auto",
	padding: "20px 0 48px",
	width: "560px",
};

const heading = {
	fontSize: "24px",
	letterSpacing: "-0.5px",
	lineHeight: "1.3",
	fontWeight: "400",
	color: "#484848",
	padding: "17px 0 0",
};

const paragraph = {
	margin: "0 0 15px",
	fontSize: "15px",
	lineHeight: "1.4",
	color: "#3c4149",
};

const buttonContainer = {
	padding: "27px 0 27px",
};

const button = {
	backgroundColor: "#5e6ad2",
	borderRadius: "3px",
	fontWeight: "600",
	color: "#fff",
	fontSize: "15px",
	textDecoration: "none",
	textAlign: "center",
	display: "block",
	padding: "11px 23px",
};

const reportLink = {
	fontSize: "14px",
	color: "#b4becc",
};

const hr = {
	borderColor: "#dfe1e4",
	margin: "42px 0 26px",
};

const code = {
	fontFamily: "monospace",
	fontWeight: "700",
	padding: "1px 4px",
	backgroundColor: "#dfe1e4",
	letterSpacing: "-0.3px",
	fontSize: "21px",
	borderRadius: "4px",
	color: "#3c4149",
};
