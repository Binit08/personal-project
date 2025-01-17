import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, onSnapshot, addDoc, doc, deleteDoc } from 'firebase/firestore'; // Import Firestore functions
import { HiUserAdd } from "react-icons/hi";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Import Formik components
import { MdDeleteOutline } from "react-icons/md";

const laptops = [
  {
    name: "Apple MacBook Air (M2, 2023)",
    price: 110000,
    image: "https://www.apple.com/v/macbook-air/s/images/overview/performance/compare/model_mba_m2__cfrbip6c05yq_large_2x.jpg"
  },
  {
    name: "Dell XPS 13 9310",
    price: 109999,
    image: "https://i.dell.com/is/image/DellContent//content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9310/general/xps-13_black_standard.jpg?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=559&qlt=100,1&resMode=sharp2&size=559,402&chrss=full"
  },
  {
    name: "Asus ROG Zephyrus G14",
    price: 94990,
    image: "https://m.media-amazon.com/images/I/71zNU5UBINL._SL1500_.jpg"
  },
  {
    name: "Lenovo ThinkPad X1 Carbon Gen 9",
    price: 159990,
    image: "https://p2-ofp.static.pub/fes/cms/2023/05/30/webi9et9bh61fej6nl54nrxnwrz8lu648215.png"
  }
];

const Footer = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure(); // useDisclosure hook

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'customer'), (snapshot) => {
      const contactList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setContacts(contactList);
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

  return (
    <div className='flex justify-center gap-5 absolute top-[55vh] left-[20vw]  '>
      <div className='h-[30vh] w-[50vw] border-4'>
        <div className='flex justify-between items-center mb-3'>
          <div className='grid grid-cols-5 gap-[5.5rem] m-2'>
            <div>Name</div>
            <div>Phone</div>
            <div>Product</div>
            <div>Price</div>
            <div>
              <HiUserAdd className='text-2xl hover:cursor-pointer hover:text-4xl' onClick={onOpen} />
            </div>
          </div>
        </div>
        <div className='h-[22vh] w-[50vw] overflow-scroll'>

    
        {contacts.map((cont) => (
          <div key={cont.id} className='grid grid-cols-5 border-[3px] m-2'>
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
      <div className='w-[20vw] border-2'>
        {/* Display laptops */}
        {laptops.map((item) => (
          <div className='flex border-2 m-2 hover:bg-zinc-100' key={item.name}>
            <img src={item.image} alt={item.name} className='w-20 h-20 object-contain' />
            <div>
              <div>{item.name}</div>
              <div>{item.price}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal component */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <div className='bg-white h-[50vh] w-[50vw] flex justify-center items-center'>
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
                  <div className='flex flex-col gap-7'>
                    <div>
                      <label htmlFor="name">Name:</label>
                      <Field type="text" id="name" name="name" className='border-2' />
                      <ErrorMessage name="name" component="div" className="error" />
                    </div>
                    <div>
                      <label htmlFor="contact">Phone:</label>
                      <Field type="text" id="contact" name="contact" className='border-2' />
                      <ErrorMessage name="contact" component="div" className="error" />
                    </div>
                    <div>
                      <label htmlFor="product">Product:</label>
                      <Field type="text" id="product" name="product" className='border-2' />
                      <ErrorMessage name="product" component="div" className="error" />
                    </div>
                    <div>
                      <label htmlFor="price">Price:</label>
                      <Field type="number" id="price" name="price" className='border-2' />
                      <ErrorMessage name="price" component="div" className="error" />
                    </div>
                    <button type="submit">Submit</button>
                  </div>
                </Form>
              </Formik>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Footer;
