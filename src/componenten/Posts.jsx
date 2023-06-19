import React, { useState, useEffect } from 'react';
import { getDocs, collection, doc } from "firebase/firestore";
import { db } from "../config/firebase";

function Posts() {
    
    const [getTaskList, setTaskList] = useState([]);
    const jobCollectionRef = collection(db, "tasks");

    useEffect(() => {
        const getTasks = async () => {
            const data = await getDocs(jobCollectionRef);
            setTaskList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getTasks();
    }, []);

}

export default Posts;