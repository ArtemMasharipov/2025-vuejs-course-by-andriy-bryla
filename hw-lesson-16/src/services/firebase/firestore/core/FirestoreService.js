import { db } from '@/config/firebase';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where
} from 'firebase/firestore';

export default class FirestoreService {
  constructor() {
    this.collectionRefs = {};
  }
  
  getCollection(collectionName) {
    if (!this.collectionRefs[collectionName]) {
      this.collectionRefs[collectionName] = collection(db, collectionName);
    }
    return this.collectionRefs[collectionName];
  }
  
  processSnapshot(snapshot) {
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
  
  prepareData(data, addTimestamps = true) {
    const safeData = JSON.parse(JSON.stringify(data));
    const preparedData = { ...safeData };
    
    if (addTimestamps) {
      if (!safeData.createdAt) {
        preparedData.createdAt = serverTimestamp();
      }
      preparedData.updatedAt = serverTimestamp();
    } else {
      preparedData.updatedAt = serverTimestamp();
    }
    
    return preparedData;
  }
  
  async getAll(collectionName) {
    try {
      const collectionRef = this.getCollection(collectionName);
      const snapshot = await getDocs(collectionRef);
      return this.processSnapshot(snapshot);
    } catch (error) {
      console.error(`Error getting all documents from ${collectionName}:`, error);
      throw error;
    }
  }
  
  async getById(collectionName, id) {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Error getting document ${collectionName}/${id}:`, error);
      throw error;
    }
  }
  
  async add(collectionName, data) {
    try {
      const collectionRef = this.getCollection(collectionName);
      const preparedData = this.prepareData(data);
      
      const docRef = await addDoc(collectionRef, preparedData);
      return {
        id: docRef.id,
        ...preparedData
      };
    } catch (error) {
      console.error(`Error adding document to ${collectionName}:`, error);
      throw error;
    }
  }
  
  async update(collectionName, id, data) {
    try {
      const docRef = doc(db, collectionName, id);
      
      if (!data || Object.keys(data).length === 0) {
        console.error('Attempting to update with empty data');
        throw new Error('Cannot update document with empty data');
      }

      const currentDoc = await getDoc(docRef);
      if (!currentDoc.exists()) {
        throw new Error(`Document ${collectionName}/${id} not found while updating`);
      }
      
      const preparedData = this.prepareData(data, false);
      
      await updateDoc(docRef, preparedData);
      
      const updatedDocSnap = await getDoc(docRef);
      
      if (!updatedDocSnap.exists()) {
        throw new Error(`Failed to retrieve updated document ${collectionName}/${id}`);
      }
      
      const updatedData = updatedDocSnap.data();
      const result = {
        id,
        ...updatedData
      };
      
      return result;
    } catch (error) {
      console.error(`Error updating document ${collectionName}/${id}:`, error);
      throw error;
    }
  }
  
  async set(collectionName, id, data) {
    try {
      const docRef = doc(db, collectionName, id);
      const preparedData = this.prepareData(data);
      
      await setDoc(docRef, preparedData);
      return { 
        id, 
        ...preparedData 
      };
    } catch (error) {
      console.error(`Error setting document ${collectionName}/${id}:`, error);
      throw error;
    }
  }
  
  async delete(collectionName, id) {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      return { id };
    } catch (error) {
      console.error(`Error deleting document ${collectionName}/${id}:`, error);
      throw error;
    }
  }
  
  async createIfNotExists(collectionName, id, data) {
    try {
      const existing = await this.getById(collectionName, id);
      
      if (!existing) {
        const result = await this.set(collectionName, id, data);
        return {
          ...result,
          isNewlyCreated: true
        };
      }
      
      return {
        ...existing,
        isNewlyCreated: false
      };
    } catch (error) {
      console.error(`Error creating/checking ${collectionName} document:`, error);
      throw error;
    }
  }
  
  async query(collectionName, conditions = [], orderByField = null, descending = false, limitCount = null) {
    try {
      const collectionRef = this.getCollection(collectionName);
      const queryConstraints = [];
      
      if (conditions && conditions.length > 0) {
        conditions.forEach(condition => {
          if (condition.field && condition.operator && condition.value !== undefined) {
            queryConstraints.push(where(condition.field, condition.operator, condition.value));
          }
        });
      }
      
      if (orderByField) {
        queryConstraints.push(orderBy(orderByField, descending ? 'desc' : 'asc'));
      }
      
      if (limitCount && limitCount > 0) {
        queryConstraints.push(limit(limitCount));
      }
      
      const q = query(collectionRef, ...queryConstraints);
      const snapshot = await getDocs(q);
      
      return this.processSnapshot(snapshot);
    } catch (error) {
      console.error(`Error querying collection ${collectionName}:`, error);
      throw error;
    }
  }
}