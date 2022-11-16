const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  //  The below commands show the log data on the terminal, so that you can check whether the data of items and email is parsed properly.
  //  Uncomment the below one to check
  //   console.log(items);
  //   console.log(email);

  const transformedItems = items.map((item) => ({
    quantity: 1,
    price_data: {
      currency: "inr",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        description: item.description,
        images: [item.image],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_options: [
      {
        shipping_rate: "shr_1M2expSHGkpIuBR9CSMPFNQU",
        // Not working, showing an axois error
        // shipping_rate_data: {
        //   fixed_amount: { amount: 0, currency: "inr" },
        //   display_name: "Free shipping",
        //   delivery_estimate: {
        //     minimum: { unit: "business_day", value: 5 },
        //     maximum: { unit: "business_day", value: 7 },
        //   },
        // },
      },
    ],
    shipping_address_collection: {
      allowed_countries: ["IN", "GB", "US", "CA"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  res.status(200).json({ id: session.id });
};
