import { v4 as uuidv4 } from "uuid";
import store from "@/store";

const api = "https://api.meuhorario.co";
const collection = "services";

const updateService = async ({ id, data }) => {
  try {
    return await fetch(`${api}/firebase`, {
      body: JSON.stringify({
        collection,
        id,
        data,
      }),
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        From: "mail-monster",
      },
    }).then((res) => res.json());
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const createService = async ({ data }) => {
  try {
    const uuid = uuidv4();
    data.created_by = store.state.account.id;
    data.uuid = uuid;
    return await fetch(`${api}/firebase`, {
      body: JSON.stringify({
        collection,
        data,
      }),
      method: "POST",
      headers: {
        "content-type": "application/json",
        From: "mail-monster",
      },
    }).then((data) => data.json());
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const getService = async ({ id }) => {
  return await fetch(`${api}/firebase/single`, {
    body: JSON.stringify({
      collection,
      id,
    }),
    method: "POST",
    headers: {
      "content-type": "application/json",
      From: "mail-monster",
    },
  })
    .then((data) => data.json())
    .then((docs) => {
      return docs;
    });
};

const getServices = async () => {
  return await fetch(`${api}/firebase/get`, {
    body: JSON.stringify({
      collection,
      where: [{ field: "shop_id", operator: "==", value: store.state.shop.id }],
      order: [{ field: "updated_at", type: "DESC" }],
    }),
    method: "POST",
    headers: {
      "content-type": "application/json",
      From: "mail-monster",
    },
  })
    .then((data) => data.json())
    .then((docs) => {
      if (docs.empty) return null;
      return docs;
    });
};

const getServiceCount = async () => {
  return await fetch(`${api}/firebase/count`, {
    body: JSON.stringify({
      collection,
      where: [
        { field: "created_by", operator: "==", value: store.state.account.id },
      ],
    }),
    method: "POST",
    headers: {
      "content-type": "application/json",
      From: "mail-monster",
    },
  })
    .then((data) => data.json())
    .then((docs) => {
      return docs.count;
    });
};

export {
  updateService,
  createService,
  getService,
  getServices,
  getServiceCount,
};
