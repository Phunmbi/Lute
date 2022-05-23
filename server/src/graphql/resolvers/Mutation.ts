import {MutationCreateOrderArgs, MutationResolvers} from '../code_generated';
import {ResolverContext} from '../../resolvers';
import OrdersService from "../../services/orders/orders";

const mutationOrderResolver: MutationResolvers<ResolverContext> = {
	createOrder: async (_, args: MutationCreateOrderArgs, context: ResolverContext) => {
		return OrdersService(context.db).createOrder(args)
	},
	
	updateOrder: async (_, args, context: ResolverContext) => {
		return OrdersService(context.db).updateOrder(args)
	},
};

export default mutationOrderResolver;
