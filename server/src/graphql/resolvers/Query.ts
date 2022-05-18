import {QueryResolvers} from '../code_generated';
import OrdersService from '../../services/orders';
import {ResolverContext} from '../../resolvers';

const queryOrderResolver: QueryResolvers<ResolverContext> = {
	order: (_, args, ctx: ResolverContext) => {
		return OrdersService(ctx.db).getOrder(args)
	},
	
	allOrders: async (_, __, ctx: ResolverContext) => {
		return OrdersService(ctx.db).getAllOrders()
	}
};

export default queryOrderResolver;
