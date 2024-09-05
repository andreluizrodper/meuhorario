import { v4 as uuidv4 } from "uuid";
import store from "@/store";

const api = location.href.includes("192.168.3.20")
  ? "http://localhost:10100"
  : "https://api.mailmonster.com.br";

const updateAccount = async ({ id, data }) => {
  try {
    const account = await getAccount({ id, setStore: false });
    const accountRef = doc(firestore, "accounts", id);
    await setDoc(accountRef, {
      ...account,
      ...data,
      updated_at: new Date(),
    });
    getAccount({ id });
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const createAccount = async ({ data, setStore = true }) => {
  try {
    const uuid = uuidv4();
    data.uuid = uuid;
    await fetch(`${api}/firebase`, {
      body: JSON.stringify({
        collection: "account",
        data,
      }),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((res) => {
        if (setStore) getAccount({ id: res.data.id });
      });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const getAccount = async ({ id, setStore = true }) => {
  return await fetch(`${api}/firebase/get`, {
    body: JSON.stringify({
      collection: "account",
      id,
    }),
    method: "POST",
    headers: {
      "content-type": "application/json",
      From: "mail-monster",
    },
  })
    .then((data) => data.json())
    .then((res) => {
      if (setStore) store.commit("setAccount", res[0]);
      return res[0];
    });
};

const accountExists = async ({ owner }) => {
  const accountExist = await fetch(`${api}/firebase/get`, {
    body: JSON.stringify({
      collection: "account",
      where: [{ field: "owner", operator: "==", value: owner }],
    }),
    method: "POST",
    headers: {
      "content-type": "application/json",
      From: "mail-monster",
    },
  })
    .then((data) => data.json())
    .then((data) => data[0]);
  console.log(accountExist);
  return accountExist?.uuid;
};

const loginAccount = async ({ id }) => {
  try {
    console.log(id);
    await fetch(`${api}/firebase/get`, {
      body: JSON.stringify({
        collection: "account",
        where: [{ field: "owner", operator: "==", value: id }],
      }),
      method: "POST",
      headers: {
        "content-type": "application/json",
        From: "mail-monster",
      },
    })
      .then((data) => data.json())
      .then((res) => {
        store.commit("setAccount", res[0]);
      });
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export {
  accountExists,
  updateAccount,
  createAccount,
  getAccount,
  loginAccount,
};
