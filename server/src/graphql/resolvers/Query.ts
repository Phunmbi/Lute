import {QueryResolvers} from "../code_generated";
import OrdersService from "../../services/orders";
import {ResolverContext} from "../../resolvers";

const queryOrderResolver: QueryResolvers<ResolverContext> = {
	getOrder: async (_, {id}, {db}) => {
		return OrdersService(db).getOrder(id);
	}
}

export default queryOrderResolver;
