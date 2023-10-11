import React, { useState } from 'react';


const ProductArray = [
             {
                 type: "checkBox",
                 data: [{
                     _id: 0,
                     title: "pet care",
                     price: 10,
                     quantity: 1
                 },
                     {
                         _id: 1,
                         title: "car wash",
                         price: 15,
                         quantity: 5
                     }]
             },
             {
                 type: "radioButton",
                 data: [{
                     _id: 0,
                     title: "hair cut",
                     price: 30,
                     quantity: 2
                 },
                     {
                         _id: 1,
                         title: "home clinging",
                         price: 20,
                         quantity: 4
                     },
                     {
                         _id: 2,
                         title: "car Wash",
                         price:290,
                         quantity: 1
                     },
                     {
                         _id: 3,
                         title: "ac Repair",
                         price: 10,
                         quantity: 2
                     },
                 ]
             }
         ];












         
        
         const ProductComponent = () => {
           const [selectedItems, setSelectedItems] = useState({});
           const [totalPrice, setTotalPrice] = useState(0);
         
           const handleCheckboxChange = (type, itemId) => {
             const updatedSelectedItems = { ...selectedItems, [`${type}_${itemId}`]: !selectedItems[`${type}_${itemId}`] };
             setSelectedItems(updatedSelectedItems);
         
             // Calculate total price based on selected items
             const newTotalPrice = ProductArray.reduce((acc, category) => {
               return (
                 acc +
                 category.data.reduce((categoryTotal, item) => {
                   if (updatedSelectedItems[`${category.type}_${item._id}`]) {
                     return categoryTotal + item.price * item.quantity;
                   }
                   return categoryTotal;
                 }, 0)
               );
             }, 0);
         
             setTotalPrice(newTotalPrice);
           };
         
           return (
             <div className="product-container">
               {ProductArray.map((category) => (
                 <div key={category.type} className="category-container">
                   <h2>{category.type}</h2>
                   {category.data.map((item) => (
                     <div key={item._id} className="item-container">
                       {category.type === 'checkBox' ? (
                         <input
                           type="checkbox"
                           checked={selectedItems[`${category.type}_${item._id}`]}
                           onChange={() => handleCheckboxChange(category.type, item._id)}
                         />
                       ) : (
                         <input
                           type="radio"
                           name={`radio_${category.type}`}
                           checked={selectedItems[`${category.type}_${item._id}`]}
                           onChange={() => handleCheckboxChange(category.type, item._id)}
                         />
                       )}
                       <span>{item.title}</span>
                     </div>
                   ))}
                 </div>
               ))}
               <div className="total-container">
                 <h2>Total Price: ${totalPrice}</h2>
               </div>
             </div>
           );
         };
         
         export default ProductComponent;
         