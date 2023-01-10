
// =====================================
// find by index
// =====================================
state.products[
  state.products.findIndex((item) => item._id === action.payload.id)
] = action.payload.product;


// =====================================
// push
// adding an item to an array
// =====================================
state.products.push(action.payload);


// =====================================
// splice
// removes item after provided index
// =====================================
const fruits = ["Banana", "Orange", "Apple", "Mango", "Kiwi"];
// At position 2, remove 2 items: 
fruits.splice(2, 2);
 " - Banana,Orange,Kiwi"


// =====================================
// Sorting a list pf objects
// =====================================
useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);


// =====================================
// filtering based on filtering object 
// =====================================
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);


// ============================
// Traversing object
// ============================

const object1 = {
    a: 'somestring',
    b: 42
  };
  
  for (const [key, value] of Object.entries(object1)) {
    console.log(`${key}: ${value}`);
  }
  
  // expected output:
  // "a: somestring"
  // "b: 42"

// ============================
// Spread operator
// ============================

    // example 1
setFilters({
    ...filters,
    [e.target.name]: value,
});

    // example-2
    //using spread operators in multiple field object . setstate

    setState(prev => {
        return {...prev,count:10}
    })