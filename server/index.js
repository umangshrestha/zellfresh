var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("__generated__/types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("resolvers/mutation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        validateUser: async (_parent, _args, context) => {
            if (!context.user) {
                throw new Error("User not authenticated");
            }
            return context.user;
        },
    };
});
define("resolvers/query", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const products = [
        {
            price: 12.99,
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXM1f7aFP4rKF-wJZ2juCb-7JcQCspEYUVwLK4JrpBdVtRB-ELAqpUCmkg6znfoG4fh8&usqp=CAU",
            quantity: 10,
            category: "chicken",
            description: "Fresh, skinless chicken breast fillets",
            name: "Chicken Breast",
            maxQuantity: 10,
            rating: 4.5,
            badgeText: "New",
            tags: ["boneless", "skinless"],
            id: "08015d07-0286-4198-94ef-15a018fad443",
        },
        {
            name: "BONELESS PORK BUTT ROAST",
            description: null,
            tags: ["boneless", ""],
            maxQuantity: 10,
            rating: 3.5,
            badgeText: null,
            id: "0dfc4f59-8561-4bea-965c-b2731aaef2f2",
            price: 100,
            imageUrl: "https://132625588.cdn6.editmysite.com/uploads/1/3/2/6/132625588/s782101613657948031_p29_i2_w1920.jpeg?width=2400&optimize=medium",
            quantity: 0,
            category: "pork",
        },
        {
            id: "9340098d-262b-4cea-976c-2d3830b040e8",
            quantity: 8,
            category: "mutton",
            maxQuantity: 10,
            rating: 4.5,
            badgeText: null,
            tags: ["tender", "lamb"],
            name: "Lamb Shoulder",
            description: "Tender lamb shoulder, great for slow cooking.",
            price: 20.99,
            imageUrl: "https://ux2cms.imgix.net/images/Smoked-Lamb-Shoulder-2.jpg?auto=compress,format&w=750",
        },
        {
            maxQuantity: 10,
            badgeText: null,
            price: 8.99,
            quantity: 21,
            rating: 4.5,
            category: "beef",
            imageUrl: "https://www.theoar.ca/wp-content/uploads/2014/07/Untitled-9-26-600x600.png",
            tags: ["boneless"],
            id: "b8ab1298-6456-4d6b-9692-3657714996d7",
            name: "Ground Beef",
            description: "Lean ground beef for burgers or tacos.",
        },
    ];
    exports.default = {
        me: async (_parent, _args, context) => {
            return context.user;
        },
        products: async () => {
            return products;
        },
    };
});
define("resolvers/index", ["require", "exports", "resolvers/mutation", "resolvers/query"], function (require, exports, mutation_1, query_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    mutation_1 = __importDefault(mutation_1);
    query_1 = __importDefault(query_1);
    exports.default = {
        Mutation: mutation_1.default,
        Query: query_1.default,
    };
});
define("schema", ["require", "exports", "path", "@graphql-tools/load", "@graphql-tools/graphql-file-loader", "@graphql-tools/schema", "resolvers/index"], function (require, exports, path_1, load_1, graphql_file_loader_1, schema_1, resolvers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    path_1 = __importDefault(path_1);
    resolvers_1 = __importDefault(resolvers_1);
    const PATH_TO_SCHEMA = path_1.default.resolve(process.cwd(), "schema", "schema.graphql");
    const schema = (0, load_1.loadSchemaSync)(PATH_TO_SCHEMA, {
        loaders: [new graphql_file_loader_1.GraphQLFileLoader()],
    });
    exports.default = (0, schema_1.addResolversToSchema)({
        schema,
        resolvers: resolvers_1.default,
    });
});
define("context/types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("context/google", ["require", "exports", "google-auth-library"], function (require, exports, google_auth_library_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.verifyGoogleIdToken = void 0;
    const verifyGoogleIdToken = async (idToken) => {
        try {
            const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            return {
                email: payload.email,
                name: payload?.name,
                imageUrl: payload?.picture,
            };
        }
        catch (error) {
            console.error(error);
            throw new Error("Invalid token");
        }
    };
    exports.verifyGoogleIdToken = verifyGoogleIdToken;
});
define("context/index", ["require", "exports", "context/google"], function (require, exports, google_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const context = async ({ req }) => {
        const provider = req.headers.provider;
        const token = req.headers.authorization?.replace("Bearer ", "") || "";
        if (provider === "google") {
            const user = await (0, google_1.verifyGoogleIdToken)(token);
            return { user };
        }
        return {};
    };
    exports.default = context;
});
define("index", ["require", "exports", "@apollo/server", "@apollo/server/standalone", "schema", "@apollo/server/plugin/disabled", "context/index"], function (require, exports, server_1, standalone_1, schema_2, disabled_1, context_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    schema_2 = __importDefault(schema_2);
    context_1 = __importDefault(context_1);
    const IS_PROD = process.env.NODE_ENV === "production";
    console.log(process.env.GOOGLE_CLIENT_SECRET);
    const server = new server_1.ApolloServer({
        schema: schema_2.default,
        introspection: !IS_PROD,
        ...(IS_PROD ? { plugins: [(0, disabled_1.ApolloServerPluginLandingPageDisabled)()] } : {}),
    });
    (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
        context: context_1.default,
    }).then(({ url }) => console.log(`🚀 Server ready at ${url}`));
});
