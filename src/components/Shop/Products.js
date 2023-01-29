import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DummyProducts=[{id:"p1",price:6,title:"Book 1",description:"first book written"},
{id:"p2",price:8,title:"Book 2",description:"second book written"}

]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DummyProducts.map((product)=>(
        <ProductItem
        key={product.id}
        id={product.id}
          title= {product.title}
          price={product.price}
          description={product.description}
        />))}
        
      </ul>
    </section>
  );
};

export default Products;
