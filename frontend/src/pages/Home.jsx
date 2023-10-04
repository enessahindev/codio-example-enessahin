import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomeComponents() {
  const [products, setProducts] = useState([]);

  const getAll = async () => {
    var response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  useEffect(() => {
    getAll();
  }, []);

  const addBasket = async (productId) => {
    let user = JSON.parse(localStorage.getItem("user"));
    let model = { productId: productId, userId: user._id };
    var response = await axios.post("http://localhost:5000/baskets/add", model);
    toast.success(response.data.message);
    getAll();
  };

  return (
    <>
      <div className="container mx-auto mt-20 items-center justify-center">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product, index) => (
              <div key={index} className="group relative">
                <div className="mx-auto">
                  <div className="w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      className="h-full w-full object-contain lg:h-full lg:w-full"
                      src={"http://localhost:5000/" + product.imageUrl}
                      alt={product.name}
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">{product.name}</h3>
                      <div className="rounded-[25px]">
                        <p className="mt-2 text-lg font-bold">
                          Ürün Adeti : {product.stock}
                        </p>
                        <p className="mt-2 mb-2 text-lg font-bold">
                          Ürün Fiyatı : {product.price} $
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => addBasket(product._id)}
                      className="btn bg-green-600 text-white hover:bg-green-700 mb-2"
                    >
                      Sepete ekle
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}
export default HomeComponents;
