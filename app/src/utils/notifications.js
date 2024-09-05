import { v4 as uuidv4 } from "uuid";
import store from "@/store";
import { getAccount } from "./account";

const api = location.href.includes("192.168.3.20")
  ? "http://localhost:10100"
  : "https://api.mailmonster.com.br";

const getNotifications = async () => {
  return await fetch(`${api}/firebase/get`, {
    body: JSON.stringify({
      collection: "notifications",
      where: [
        {
          field: "accounts",
          operator: "array-contains",
          value: store.state.account.id,
        },
      ],
      order: [
        {
          field: "created_at",
          type: "desc",
        },
      ],
    }),
    method: "POST",
    headers: {
      "content-type": "application/json",
      From: "mail-monster",
    },
  })
    .then((data) => data.json())
    .then((res) => {
      return res;
    });
};

const getNotificationsClub = async ({ club_id }) => {
  const qNotifications = query(
    collection(firestore, "notifications"),
    where("club_id", "==", club_id),
    orderBy("created_at", "desc"),
  );
  const notificationDocs = await getDocs(qNotifications);
  return notificationDocs.docs;
};

const getNotificationsByAccount = async ({ account_id }) => {
  const qNotifications = query(
    collection(firestore, "notifications"),
    where("account_id", "==", account_id),
    orderBy("created_at", "desc"),
  );
  const notificationDocs = await getDocs(qNotifications);
  return notificationDocs.docs;
};

const createNotification = async ({ data }) => {
  const account = await getAccount({
    id: store.state.account.id,
    setStore: false,
  });
  addDoc(collection(firestore, "notifications"), {
    ...data,
    account: account,
    read_by: [account.id],
    created_at: new Date(),
  });
};

const markNotificationAsRead = async ({ id }) => {
  const notificationRef = doc(firestore, "notifications", id);
  const notification = await getDoc(notificationRef);
  console.log(notification.data().read_by);
  setDoc(notificationRef, {
    ...notification.data(),
    read_by: [...notification.data().read_by, store.state.account.id],
  });
};

export {
  createNotification,
  markNotificationAsRead,
  getNotifications,
  getNotificationsClub,
  getNotificationsByAccount,
};
