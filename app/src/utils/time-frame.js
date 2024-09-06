import { v4 as uuidv4 } from "uuid";
import store from "@/store";

const api = "https://api.meuhorario.co";
const collection = "timeFrame";

const updateTimeFrame = async ({ id, data }) => {
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

const createTimeFrame = async ({ data }) => {
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

const getTimeFrame = async ({ id }) => {
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

const getTimeFrames = async () => {
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

const getTimeFramesByDay = async ({ day }) => {
  return await fetch(`${api}/firebase/get`, {
    body: JSON.stringify({
      collection,
      where: [
        { field: "day", operator: "==", value: day },
        { field: "shop_id", operator: "==", value: store.state.shop.id },
      ],
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

const getTimeFrameCount = async () => {
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
  updateTimeFrame,
  createTimeFrame,
  getTimeFrame,
  getTimeFrames,
  getTimeFrameCount,
  getTimeFramesByDay,
};
