const CartItem = ({ item, onRemove }) => (
    <div className="cart-item">
        <img src={item.image} alt={item.name} />
        <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>Price: ₦{item.price}</p>
            <button onClick={() => onRemove(item.id)}>Remove</button>
        </div>
    </div>
);

export default CartItem;