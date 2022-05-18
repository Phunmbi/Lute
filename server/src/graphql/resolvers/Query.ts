import {QueryOrderArgs, QueryResolvers} from '../code_generated';
import OrdersService from '../../services/orders';
import {ResolverContext} from '../../resolvers';

const queryOrderResolver: QueryResolvers<ResolverContext> = {
	order: async (_, args: QueryOrderArgs, context: ResolverContext) => {
		return OrdersService(context.db).getOrder(args)
	},
	
	allOrders: async (_, __, context: ResolverContext) => {
		return OrdersService(context.db).getAllOrders()
	}
};

export default queryOrderResolver;
