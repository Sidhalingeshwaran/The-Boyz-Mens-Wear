import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';

const PRODUCTS_COLLECTION = 'products';

export async function addProduct(data) {
  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
    ...data,
    createdAt: serverTimestamp()
  });
  return docRef.id;
}

export async function updateProduct(id, data) {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
}

export async function deleteProduct(id) {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await deleteDoc(docRef);
}

export async function getProducts(filters = {}) {
  let q = collection(db, PRODUCTS_COLLECTION);
  const constraints = [];

  if (filters.category) {
    constraints.push(where('category', '==', filters.category));
  }
  if (filters.tier) {
    constraints.push(where('tier', '==', filters.tier));
  }

  constraints.push(orderBy('createdAt', 'desc'));

  q = query(q, ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getProductById(id) {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  }
  return null;
}

export async function getAllProducts() {
  const q = query(collection(db, PRODUCTS_COLLECTION), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
