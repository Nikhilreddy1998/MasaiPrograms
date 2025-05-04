/*Problem 2: Insurance Products Catalog
API: https://www.google.com/search?q=https://fakestoreapi.com/products

Routing:

/ → ProductList

/product/:id → ProductDetail

/cart → Cart

State & Effects:

Fetch all products once and store them using ProductsContext.

Context API:

CartContext for cart management.

Conditional Rendering:

Show "Your cart is empty" if no items.

Show list of cart items with subtotal if items exist.

Interactions:

"Add to Cart" button disabled if already added.

After adding, redirect to /cart.
*/