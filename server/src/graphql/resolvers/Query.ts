import {orders} from "../../localdb";
import {QueryResolvers} from "../code_generated";

const queryOrderResolver: QueryResolvers = {
	getOrder: () => {
		return orders[0]
	}
}

export default queryOrderResolver;
