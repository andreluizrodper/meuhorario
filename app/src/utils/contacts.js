import { v4 as uuidv4 } from "uuid";
import store from "@/store";

const api = "https://api.meuhorario.co";
const collection = "contacts";

const updateContact = async ({ id, data }) => {
  try {
    data.uploaded = { ...data, ...data.uploaded };
    await fetch(`${api}/firebase`, {
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
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const createContact = async ({ data }) => {
  try {
    const uuid = uuidv4();
    data.uploaded = { ...data };
    data.created_by = store.state.account.id;
    data.uuid = uuid;
    data.status = true;
    await fetch(`${api}/firebase`, {
      body: JSON.stringify({
        collection,
        data,
      }),
      method: "POST",
      headers: {
        "content-type": "application/json",
        From: "mail-monster",
      },
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const getAllContacts = async () => {
  return await fetch(`${api}/firebase/get`, {
    body: JSON.stringify({
      collection,
      where: [
        { field: "account_id", operator: "==", value: store.state.account.id },
        { field: "status", operator: "==", value: true },
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
      return docs;
    });
};

const getContactsFromList = async ({ list_id }) => {
  return await fetch(`${api}/firebase/get`, {
    body: JSON.stringify({
      collection,
      where: [
        { field: "account_id", operator: "==", value: store.state.account.id },
        { field: "list_id", operator: "array-contains-any", value: [list_id] },
        { field: "status", operator: "==", value: true },
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
      return docs;
    });
};

const processContacts = async ({ list_id, contacts }) => {
  const existingContacts = await getAllContacts();

  let updated = 0;
  let created = 0;
  for (const contact of contacts) {
    let index;
    if (existingContacts.length > 0) {
      index = existingContacts.findIndex(
        (existingContact) => existingContact.email === contact.email,
      );
    }

    if (index >= 0) {
      if (!contact.list_id) contact.list_id = [];
      if (!contact.list_id.includes(list_id)) {
        contact.list_id.push(list_id);
      }
      console.log(existingContacts, index, existingContacts[index]);
      await updateContact({
        id: existingContacts[index].id,
        data: contact,
      });
      updated++;
    } else {
      contact.account_id = store.state.account.id;
      contact.list_id = [list_id];
      await createContact({
        data: contact,
      });
      created++;
    }
    store.commit("setContactUploadProgress", updated + created);
  }

  return {
    created,
    updated,
  };
};

const getAllContactsCount = async () => {
  return await fetch(`${api}/firebase/count`, {
    body: JSON.stringify({
      collection,
      where: [
        { field: "created_by", operator: "==", value: store.state.account.id },
        { field: "status", operator: "==", value: true },
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

const getByListContactsCount = async ({ list_id }) => {
  return await fetch(`${api}/firebase/count`, {
    body: JSON.stringify({
      collection,
      where: [
        { field: "created_by", operator: "==", value: store.state.account.id },
        { field: "list_id", operator: "array-contains", value: list_id },
        { field: "status", operator: "==", value: true },
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
  updateContact,
  createContact,
  getAllContacts,
  getContactsFromList,
  processContacts,
  getAllContactsCount,
  getByListContactsCount,
};
