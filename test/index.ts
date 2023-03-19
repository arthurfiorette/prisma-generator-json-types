import { Prisma, PrismaClient, User } from "@prisma/client";

declare global {
  namespace PrismaJson {
    type Simple = { a: number };

    type Optional = { a: number };

    type List = { a: number };

    type String = "a" | "b";
  }
}

declare function user<T extends Omit<User, "id">>(_: T): void;
declare const client: PrismaClient["user"];

user({
  simple: {
    //@ts-expect-error - should be a
    b: 1,
  },

  optional: {
    //@ts-expect-error - should be a
    b: "not a number",
  },

  list: [
    {
      //@ts-expect-error - should be a
      b: true,
    },
  ],
});

user({
  //@ts-expect-error - not optional
  simple: null,

  // optional
  optional: null,

  //@ts-expect-error - not optional
  list: null,
});

user({
  //@ts-expect-error - not a list
  simple: [
    {
      a: 1,
    },
  ],

  //@ts-expect-error - not a list
  optional: [
    {
      a: 1,
    },
  ],

  list: [
    {
      a: 1,
    },
  ],
});

client.create({
  data: {
    simple: {
      //@ts-expect-error - should be a
      b: 1,
    },

    optional: {
      //@ts-expect-error - should be a
      b: "not a number",
    },

    list: [
      {
        //@ts-expect-error - should be a
        b: true,
      },
    ],
  },
});

client.create({
  data: {
    //@ts-expect-error - not optional
    simple: null,

    // optional
    optional: Prisma.DbNull,

    //@ts-expect-error - not optional
    list: null,
  },
});

client.create({
  data: {
    //@ts-expect-error - not a list
    simple: [
      {
        a: 1,
      },
    ],

    //@ts-expect-error - not a list
    optional: [
      {
        a: 1,
      },
    ],

    list: [
      {
        a: 1,
      },
    ],
  },
});

client.create({
  data: {
    simple: {
      //@ts-expect-error - should be a
      b: 1,
    },

    optional: {
      //@ts-expect-error - should be a
      b: "not a number",
    },

    list: {
      set: {
        //@ts-expect-error - should be a
        b: true,
      },
    },
  },
});

client.create({
  data: {
    simple: {
      //@ts-expect-error - should be a
      b: 1,
    },

    optional: {
      //@ts-expect-error - should be a
      b: "not a number",
    },

    list: {
      set: [
        {
          //@ts-expect-error - should be a
          b: true,
        },
      ],
    },
  },
});

client.findMany({
  where: {
    list: {
      equals: [
        {
          //@ts-expect-error - should be a
          b: 1,
        },
      ],
      has: {
        //@ts-expect-error - should be a
        b: 1,
      },
      hasEvery: [
        {
          //@ts-expect-error - should be a
          b: 1,
        },
      ],
      hasSome: [
        {
          //@ts-expect-error - should be a
          b: 1,
        },
      ],
      isEmpty: false,
    },
  },
});

client.findMany({
  where: {
    list: {
      equals: {
        //@ts-expect-error - should be a
        b: 1,
      },
      has: {
        //@ts-expect-error - should be a
        b: 1,
      },
      hasEvery: {
        //@ts-expect-error - should be a
        b: 1,
      },
      hasSome: {
        //@ts-expect-error - should be a
        b: 1,
      },
      isEmpty: false,
    },
  },
});

client.update({
  data: {
    simple: {
      //@ts-expect-error - should be a
      b: 1,
    },

    optional: {
      //@ts-expect-error - should be a
      b: "not a number",
    },

    list: [
      {
        //@ts-expect-error - should be a
        b: true,
      },
    ],
  },
});

client.update({
  data: {
    //@ts-expect-error - not optional
    simple: null,

    // optional
    optional: Prisma.DbNull,

    //@ts-expect-error - not optional
    list: null,
  },
});

client.update({
  data: {
    //@ts-expect-error - not a list
    simple: [
      {
        a: 1,
      },
    ],

    //@ts-expect-error - not a list
    optional: [
      {
        a: 1,
      },
    ],

    list: [
      {
        a: 1,
      },
    ],
  },
});

client.update({
  data: {
    //@ts-expect-error - not a list
    simple: [
      {
        a: 1,
      },
    ],

    //@ts-expect-error - not a list
    optional: [
      {
        a: 1,
      },
    ],

    list: {
      set: [
        {
          //@ts-expect-error - should be a
          b: true,
        },
      ],
    },
  },
});

client.update({
  data: {
    //@ts-expect-error - not a list
    simple: [
      {
        a: 1,
      },
    ],

    //@ts-expect-error - not a list
    optional: [
      {
        a: 1,
      },
    ],

    list: {
      set: {
        //@ts-expect-error - should be a
        b: true,
      },
    },
  },
});

client.update({
  data: {
    //@ts-expect-error - not a list
    simple: [
      {
        a: 1,
      },
    ],

    //@ts-expect-error - not a list
    optional: [
      {
        a: 1,
      },
    ],

    list: {
      push: [
        {
          //@ts-expect-error - should be a
          b: true,
        },
      ],
    },
  },
});

client.update({
  data: {
    //@ts-expect-error - not a list
    simple: [
      {
        a: 1,
      },
    ],

    //@ts-expect-error - not a list
    optional: [
      {
        a: 1,
      },
    ],

    list: {
      push: {
        //@ts-expect-error - should be a
        b: true,
      },
    },
  },
});

user({
  simple: {
    //@ts-expect-error - should be a
    b: 1,
  },

  optional: {
    //@ts-expect-error - should be a
    b: "not a number",
  },

  list: [
    {
      //@ts-expect-error - should be a
      b: true,
    },
  ],

  //@ts-expect-error - should only be a | b
  stringField: "c",
});

//@ts-expect-error - should only be a | b
client.findMany({ where: { stringField: "c" } });

//@ts-expect-error - should only be a | b
client.aggregate({ _count: { list: true }, where: { stringField: "c" } });

client.groupBy({
  by: ["stringField"],
  _count: { list: true },
  //@ts-expect-error - should only be a | b
  having: { stringField: "c" },
});

client.groupBy({
  by: ["stringField"],
  _count: { list: true },
  //@ts-expect-error - should only be a | b
  having: { stringField: { equals: "c" } },
});

client.groupBy({
  by: ["stringField"],
  _count: { list: true },
  //@ts-expect-error - should only be a | b
  having: { stringField: { not: "c" } },
});

client.groupBy({
  by: ["stringField"],
  _count: { list: true },
  //@ts-expect-error - should only be a | b
  having: { stringField: { not: { equals: "c" } } },
});

client.groupBy({
  by: ["stringField"],
  _count: { list: true },
  //@ts-expect-error - should only be a | b
  having: { stringField: { in: ["a", "b", "c"] } },
});

client.groupBy({
  by: ["stringField"],
  _count: { list: true },
  //@ts-expect-error - should only be a | b
  having: { stringField: { notIn: ["a", "b", "c"] } },
});
