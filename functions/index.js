// const { onRequest } = require("firebase-functions/v2/https");
// const { initializeApp } = require("firebase-admin/app");
// const {
//   getFirestore,
//   addDoc,
//   collection,
//   getDocs,
//   deleteDoc,
//   doc,
// } = require("firebase-admin/firestore");
// const uuid = require("uuid");

// initializeApp();
// const db = getFirestore();

// exports.test = onRequest(async (req, res) => {
//   try {
//     const { theme } = req.query;

//     if (!theme) {
//       return res
//         .status(400)
//         .json({ error: "Bad Request", msg: "Missing 'theme' parameter" });
//     }

//     const collectionRef = db
//       .collection(theme)
//       .get()
//       .then(async (querySnapshot) => {
//         let docs = querySnapshot.docs;
//         if (querySnapshot.size === 0) {
//           const id = uuid.v4();
//           await addDoc(collectionRef, { id });
//           res.json({ result: "Document added", id, theme });
//         } else {
//           const docSnapshot = querySnapshot.docs[0];
//           const id = docSnapshot.id;

//           await deleteDoc(doc(db, theme, id));

//           res.json({ result: "Document deleted", id, theme });
//         }
//       });
//     // const querySnapshot = await getDocs(collectionRef);

//     if (querySnapshot.size === 0) {
//       const id = uuid.v4();
//       await addDoc(collectionRef, { id });
//       res.json({ result: "Document added", id, theme });
//     } else {
//       const docSnapshot = querySnapshot.docs[0];
//       const id = docSnapshot.id;

//       await deleteDoc(doc(db, theme, id));

//       res.json({ result: "Document deleted", id, theme });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     res
//       .status(500)
//       .json({ error: "Internal Server Error", msg: error.message });
//   }
// });

// const { onRequest } = require("firebase-functions/v2/https");
// const uuid = require("uuid");
// const { initializeApp } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");

// initializeApp();
// const db = getFirestore();

// exports.test = onRequest(async (req, res) => {
//   const { theme } = req.body;
//   const counted = await db.collection(theme).count();
//   let id = uuid.v4();
//   if (counted === 0) {
//     db.collection(theme).add({ id: id });
//   } else {
//     id = db.collection(theme).doc(1).id;
//     db.collection(theme).delete();
//   }
//   res.json({ result: `Hello World`, id: id });
// });

// Listens for new messages added to /messages/:documentId/original
// and saves an uppercased version of the message
// to /messages/:documentId/uppercase
// exports.makeuppercase = onDocumentCreated("/messages/{documentId}", (event) => {
//   // Grab the current value of what was written to Firestore.
//   const original = event.data.data().original;

//   // Access the parameter `{documentId}` with `event.params`
//   logger.log("Uppercasing", event.params.documentId, original);

//   const uppercase = original.toUpperCase();

//   // You must return a Promise when performing
//   // asynchronous tasks inside a function
//   // such as writing to Firestore.
//   // Setting an 'uppercase' field in Firestore document returns a Promise.
//   return event.data.ref.set({ uppercase }, { merge: true });
// });
