import { v4 as uuidv4 } from "uuid";
import store from "@/store";

const api = location.href.includes("192.168.3.20")
  ? "http://localhost:10100"
  : "https://api.mailmonster.com.br";

const collection = "campaigns";

const sendCampaign = async ({ id }) => {
  try {
    return await fetch(`${api}/send-campaign`, {
      body: JSON.stringify({
        id,
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

const updateCampaign = async ({ id, data }) => {
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
    }).then((data) => data.json());
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const createCampaign = async ({ data }) => {
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

const getCampaign = async ({ id }) => {
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

const getCampaigns = async () => {
  return await fetch(`${api}/firebase/get`, {
    body: JSON.stringify({
      collection,
      where: [
        { field: "created_by", operator: "==", value: store.state.account.id },
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

const getCampaignCount = async () => {
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
  updateCampaign,
  createCampaign,
  getCampaign,
  getCampaigns,
  getCampaignCount,
  sendCampaign,
};
