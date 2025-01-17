import React, { useEffect, useState } from 'react';
import { db } from '/Users/binit/Desktop/project 7/src/config/firebase.js';
import { collection, onSnapshot, addDoc, doc, deleteDoc } from 'firebase/firestore'; // Import Firestore functions
import { HiUserAdd } from "react-icons/hi";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Portal } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Import Formik components
import { MdDeleteOutline } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { CiBellOn } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMessage } from "react-icons/md";
import GoogleSignInButton from '../../config/GoogleSignInButton';
// sign in

import { auth, provider } from "/Users/binit/Desktop/project 7/src/config/firebase.js"; // Adjust the path based on your project structure
import { signInWithRedirect } from 'firebase/auth';
const Navbar = () => {
  const [addprice, setAddprice] = useState(0);
  const [totalmen, setTotalmen] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [x,setX] =useState([5])
  const { isOpen, onOpen, onClose } = useDisclosure(); // useDisclosure hook

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'customer'), (snapshot) => {
      const contactList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setContacts(contactList);
      const sum = contactList.reduce((acc, cur) => acc + cur.price, 0);
      setAddprice(sum);
      const size = contactList.length
      setTotalmen(size)
    });
    return unsubscribe; // Cleanup the listener
  }, []);

  const addContact = async (contact) => {
    try {
      const docRef = await addDoc(collection(db, 'customer'), contact);
      console.log('Contact added successfully with ID: ', docRef.id);
      onClose(); // Close modal after successful submission
    } catch (error) {
      console.error('Error adding contact: ', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, 'customer', id);
      await deleteDoc(docRef);
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleSubmit = (values, actions) => {
    console.log('Form values:', values);
    addContact(values); // Call addContact function with form values
    actions.resetForm(); // Reset form after submission
  };

  const filterContacts = (e) => {
    const value = e.target.value.toLowerCase();
    const unsubscribe = onSnapshot(
      collection(db, 'customer'),
      (snapshot) => {
        const contactList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        const filteredContactList = contactList.filter((customer) =>
          customer.name.toLowerCase().includes(value)
        );
        setContacts(filteredContactList);
      }
    );
    return unsubscribe;
  };

  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };
  const handleSignInSuccess = () => {
    onClose(); // Close the dropdown after sign-in
    history.push("/"); // Redirect to homepage after sign-in
  };
// sig in 
const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSignIn = () => {
    signInWithRedirect(auth, provider)
      .then((result) => {
        const userEmail = result.user.email;
        setEmail(userEmail);
        localStorage.setItem("email", userEmail);
        onSignInSuccess()
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  };
  const handleLogout = () => {
    // Call the function to remove 'email' from local storage
    auth.signOut()
    .then(() => {
      console.log('User logged out successfully');
      // Additional logic after logout (e.g., clearing localStorage)
      localStorage.removeItem('email'); // Clear email from localStorage
    })
    .catch((error) => {
      console.error('Error logging out:', error);
    });
  };
  return (
    <div className='flex flex-col items-center '>
      {/* Navbar */}
      <div className="w-[85vw] bg-transparent  h-[7vh] fixed top-0 right-0 flex items-center justify-end p-2 shadow-lg">
        <div className="flex items-center space-x-2 absolute left-0 border-pink-400">
          <FiSearch className="text-white" />
          <input
            type="text"
            placeholder="SEARCH"
            className="bg-transparent border-b focus:outline-none text-white"
            onChange={filterContacts}
          />
        </div>
        <div className='flex gap-3'>
          <MdOutlineMessage className='text-3xl text-white' onClick={()=>{
              toggleDropdown();
              setX(0)
            }} />
          <CiBellOn className='text-3xl text-white' onClick={()=>{
              toggleDropdown();
              setX(2)
            }} />
          <div className="relative">
            <CgProfile className='text-3xl text-white cursor-pointer' onClick={()=>{
              toggleDropdown();
              setX(1)
            }} />
            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg py-2 z-10">
            {x === 1 ? (
      <>
        <div className='text-black'>
        {/* 
        sign in */}
         <div>
     
     <button onClick={handleSignIn}>Sign in with Google</button>
 
 </div>
    </div>
        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white" onClick={handleLogout}>
          Logout
        </a>
      </>
    ) : x === 2 ? (
      <div className='p-1'>no notification yet</div>
    ) : (
      <div className='p-1'>no message yet</div>
    )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Middle content */}

      <div>


<div className=' flex   gap-5  absolute top-[10vh] right-[25vw] '>
    <div className='w-24 h-24 sm:w-32 sm:h-32 lg:w-56 lg:h-56 flex flex-col items-center justify-center rounded-full shadow-xl bg-[#ffd7b82d]'><h2>
      total custumers 
    </h2>
      <div>{totalmen}</div>
    </div>
    <div className='w-24 h-24 sm:w-32 sm:h-32 lg:w-56 lg:h-56 flex flex-col items-center justify-center rounded-full  shadow-xl bg-[#ffd7b82d]'>
      <h2>total sales
        </h2>
        <div>{addprice}</div></div>
   
   
</div>


</div>
      <div className='absolute top-[43vh] right-[8vw] '>
        <div className='flex justify-center gap-5 mt-20'>
          <div className='h-[40vh] w-[70vw] shadow-xl bg-[#fc94401c] rounded-md'>
            <div className='flex justify-between items-center mb-3'>
              <div className='grid grid-cols-5 gap-[9.5rem] m-2'>
                <div>Name</div>
                <div>Phone</div>
                <div>Product</div>
                <div>Price</div>
                <div>
                  <HiUserAdd className='text-2xl hover:cursor-pointer hover:text-4xl' onClick={onOpen} />
                </div>
              </div>
            </div>
            <div className='h-[32vh] w-[70vw] overflow-scroll'>
              {contacts.map((cont) => (
                <div key={cont.id} className='grid grid-cols-5  m-3 shadow-md bg-[#fda4504b] rounded-sm'>
                  <div>{cont.name}</div>
                  <div>{cont.contact}</div>
                  <div>{cont.product}</div>
                  <div>{cont.price}</div>
                  <div className='text-3xl hover:cursor-pointer hover:text-red-700 hover:text-4xl' onClick={() => handleDelete(cont.id)}>
                    <MdDeleteOutline />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal component */}
          <Portal>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalContent>
                <ModalCloseButton className='z-40 absolute top-[17vh] right-[48vw] bg-[#ffffff8f] p-3 rounded-full hover:bg-[#ff000089]' />
                <ModalOverlay className='backdrop-filter backdrop-blur-sm' />
                <ModalBody>
                  <div className='bg-[#ab573261]  h-[50vh] w-[50vw] flex justify-center items-center absolute top-[25vh] right-[25vw]  '>
                    <Formik
                      initialValues={{
                        name: '',
                        contact: '',
                        product: '',
                        price: ''
                      }}
                      onSubmit={handleSubmit}
                    >
                      <Form>
                        <div className='flex flex-col gap-7 justify-center align-middle'>
                          <div>
                            <label htmlFor="name">Name:</label>
                            <Field type="text" id="name" name="name" className='rounded-md bg-[#00000083]' />
                            <ErrorMessage name="name" component="div" className="error" />
                          </div>
                          <div>
                            <label htmlFor="contact">Phone:</label>
                            <Field type="text" id="contact" name="contact" className='rounded-md bg-[#00000083]' />
                            <ErrorMessage name="contact" component="div" className="error" />
                          </div>
                          <div>
                            <label htmlFor="product">Product:</label>
                            <Field type="text" id="product" name="product" className='rounded-md bg-[#00000083]' />
                            <ErrorMessage name="product" component="div" className="error" />
                          </div>
                          <div>
                            <label htmlFor="price">Price:</label>
                            <Field type="number" id="price" name="price" className='rounded-md bg-[#00000083]' />
                            <ErrorMessage name="price" component="div" className="error" />
                          </div>
                          <button type="submit" className='hover:bg-[#0000006a] '>Submit</button>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Portal>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
