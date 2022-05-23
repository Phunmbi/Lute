import firebase from "../firebase";
import { AuthenticationError } from "apollo-server-express";

const authMiddleware = async (token: string) => {
	if (!token) throw new AuthenticationError("Unauthorized");

	try {
		const bearerToken: string = token.split(" ")[1];
		const decodedToken: { uid: string } = await firebase
			.auth()
			.verifyIdToken(bearerToken);
		return { uid: decodedToken.uid };
	} catch (e) {
		throw new AuthenticationError("Error verifying Id");
	}
};

export default authMiddleware;
