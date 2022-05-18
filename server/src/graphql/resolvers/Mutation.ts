import {MutationCreateOrderArgs, MutationResolvers} from '../code_generated';
import {ResolverContext} from '../../resolvers';
import OrdersService from "../../services/orders";

const mutationOrderResolver: MutationResolvers<ResolverContext> = {
	createOrder: async (_, args: MutationCreateOrderArgs, context: ResolverContext) => {
		return OrdersService(context.db).createOrder(args)
	},
};

export default mutationOrderResolver;
