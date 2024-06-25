import axios from 'axios';

const CartService = {
    // Function to fetch userId from localStorage
    getUserId: () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            throw new Error('User ID not found in localStorage.');
        }
        return userId;
    },

    // Function to fetch product details by productId from backend API
    getProductById: async (productId) => {
        try {
            const response = await axios.get(`https://furniture-cart-5.onrender.com/api/user/product/${productId}`);
            if (response.status === 200) {
                return response.data; // Return product details
            } else {
                throw new Error('Failed to fetch product details');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            throw new Error('Failed to fetch product details. Please try again later.');
        }
    },

    // Function to add product to cart
    addToCart: async (userId, productId, quantity) => {
        try {
            const response = await axios.post(`https://furniture-cart-5.onrender.com/api/user/addcart/${userId}`, {
                productId,
                quantity
            });
            return response.data; // Optionally handle response if needed
        } catch (error) {
            console.error('Error adding product to cart:', error);
            throw new Error('Failed to add product to cart. Please try again later.');
        }
    }
};

export default CartService;