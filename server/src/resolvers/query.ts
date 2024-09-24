import { Product, QueryResolvers } from "../__generated__/types";

const products: Product[] = [
  {
    price: 12.99,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXM1f7aFP4rKF-wJZ2juCb-7JcQCspEYUVwLK4JrpBdVtRB-ELAqpUCmkg6znfoG4fh8&usqp=CAU",
    quantity: 10,
    category: "chicken",
    description: "Fresh, skinless chicken breast fillets",
    name: "Chicken Breast",
    maxQuantity: 10,
    badgeText: "New",
    tags: ["boneless", "skinless"],
    id: "08015d07-0286-4198-94ef-15a018fad443",
  },
  {
    name: "BONELESS PORK BUTT ROAST",
    description: null,
    tags: ["boneless", ""],
    maxQuantity: 10,
    badgeText: null,
    id: "0dfc4f59-8561-4bea-965c-b2731aaef2f2",
    price: 100,
    imageUrl:
      "https://132625588.cdn6.editmysite.com/uploads/1/3/2/6/132625588/s782101613657948031_p29_i2_w1920.jpeg?width=2400&optimize=medium",
    quantity: 0,
    category: "pork",
  },
  {
    id: "9340098d-262b-4cea-976c-2d3830b040e8",
    quantity: 8,
    category: "mutton",
    maxQuantity: 10,
    badgeText: null,
    tags: ["tender", "lamb"],
    name: "Lamb Shoulder",
    description: "Tender lamb shoulder, great for slow cooking.",
    price: 20.99,
    imageUrl:
      "https://ux2cms.imgix.net/images/Smoked-Lamb-Shoulder-2.jpg?auto=compress,format&w=750",
  },
  {
    maxQuantity: 10,
    badgeText: null,
    price: 8.99,
    quantity: 21,
    category: "beef",
    imageUrl:
      "https://www.theoar.ca/wp-content/uploads/2014/07/Untitled-9-26-600x600.png",
    tags: ["boneless"],
    id: "b8ab1298-6456-4d6b-9692-3657714996d7",
    name: "Ground Beef",
    description: "Lean ground beef for burgers or tacos.",
  },
];

export default {
  me: async (_parent, _args, context) => {
    return context.user;
  },
  products: async () => {
    return products;
  },
} satisfies QueryResolvers;
