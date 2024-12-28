export const info = {
    definition: {
      openapi: "3.0.3",
      info: {
        title: "API Asegura2.com",
        version: "1.0.0",
        description:
          "Documentacion API gestion de clietnes y procesos administrativos",
      },
      servers: [
        {
          url: "http://localhost:3000",
        }
      ],
    },
    apis: ["./src/docs/*.yml"],
  };
  