import { v4 as uuidv4 } from "uuid";

const addNewsletter = async ({ email }) => {
  try {
    const uuid = uuidv4();
    const data = {};
    data.uuid = uuid;
    data.email = email;
    data.created_at = new Date();
    data.updated_at = new Date();
    const project = await addDoc(collection(firestore, "newsletter"), data);
    return project;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const addNewsletterForClub = async ({ email, club_id }) => {
  try {
    const uuid = uuidv4();
    const data = {};
    data.uuid = uuid;
    data.club_id = club_id;
    data.email = email;
    data.created_at = new Date();
    data.updated_at = new Date();
    const project = await addDoc(collection(firestore, "newsletter"), data);
    return project;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const getNewsletterSubscribers = async ({ club_id }) => {
  const queryParams = [where("club_id", "==", club_id)];
  queryParams.push(orderBy("updated_at", "desc"));
  const qNewsletter = query(
    collection(firestore, "newsletter"),
    ...queryParams,
  );
  const newsletterDocs = await getDocs(qNewsletter);
  if (newsletterDocs.empty) return null;
  return newsletterDocs.docs;
};

const getNewsletterSubscriberByClubCount = async ({ club_id }) => {
  const queryParams = [where("club_id", "==", club_id)];
  const qNewsletterSubscriber = query(
    collection(firestore, "newsletter"),
    ...queryParams,
  );
  const newsletterSubscriberDocs = await getCountFromServer(
    qNewsletterSubscriber,
  );
  return newsletterSubscriberDocs.data().count;
};

export {
  addNewsletter,
  getNewsletterSubscribers,
  addNewsletterForClub,
  getNewsletterSubscriberByClubCount,
};
