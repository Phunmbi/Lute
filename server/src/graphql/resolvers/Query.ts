import {QueryResolvers} from '../code_generated';
import OrdersService from '../../services/orders/orders';
import {ResolverContext} from '../../resolvers';

const queryOrderResolver: QueryResolvers<ResolverContext> = {
	order: (_, args, ctx: ResolverContext) => {
		return OrdersService(ctx.db).getOrder(args)
	},
	
	allOrders: async (_, args, ctx: ResolverContext) => {
		return OrdersService(ctx.db).getAllOrders(args)
	}
};

export default queryOrderResolver;
