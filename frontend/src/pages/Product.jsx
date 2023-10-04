import { useState, useEffect } from "react";
import axios from "axios";
import { BiEdit, BiTrash } from "react-icons/bi";

function ProductComponents() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const getAll = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  useEffect(() => {
    getAll();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    var input = document.querySelector("input[type='file']");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("stock", stock);
    formData.append("categoryName", categoryName);
    formData.append("price", price);
    formData.append("image", input.files[0], input.files[0].name);

    var response = await axios.post(
      "http://localhost:5000/products/add",
      formData
    );
    alert(response.data.message);

    getAll();

    let element = document.getElementById("addModalCloseBtn");
    element.click();
    setName("");
    setPrice("");
    setStock("");
    setCategoryName(0);
    input.value = "";
  };

  const remove = async (_id) => {
    let confirm = window.confirm("Would you like to delete the product?");
    if (confirm) {
      let model = { _id: _id, stock: stock };
      let response = await axios.post(
        "http://localhost:5000/products/remove",
        model
      );
      alert(response.data.message);
      getAll();
    }
  };

  const update = async (_id, name, categoryName, stock, price) => {
    let up = window.confirm("Would you like update items?");
    if (up) {
      let model = {
        _id: _id,
        name: name,
        categoryName: categoryName,
        stock: stock,
        price: price,
      };
      let response = await axios.post(
        "http://localhost:5000/products/update",
        model
      );
      alert(response.data.message);
      getAll();
    }
  };

  return (
    <>
      <section className="h-screen xl:h-[90vh]">
        <div className="container mx-auto h-full">
          <div className="flex flex-col justify-center items-center xl:justify-center h-full">
            <h2 className="h2 text">Ürün Listesi</h2>
            <div>
              <div className="mx-auto container">
                <button
                  className="btn bg-green-700 shadow-sm mb-2 text-white hover:bg-black"
                  data-bs-toggle="modal"
                  data-bs-target="#addModal"
                >
                  Ürün Ekle+
                </button>
                <table className="table table-fixed border-collapse border">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Image</th>
                      <th scope="col">Ürün Adı</th>
                      <th scope="col">Kategori</th>
                      <th scope="col">Ürün Adet</th>
                      <th scope="col">Ürün Fiyat</th>
                      <th scope="col">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="container mx-auto">
                    {products.map((product, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            style={{ width: "auto", height: "100px" }}
                            src={"http://localhost:5000/" + product.imageUrl}
                            alt=""
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.categoryName}</td>
                        <td>{product.stock}</td>
                        <td>{product.price}</td>
                        <td className="gap-2">
                          <button
                            onClick={() => remove(product._id)}
                            className="btn bg-red-700 ml-2 mt-2 text-white hover:bg-black"
                          >
                            <BiTrash className="rounded-sm" />
                          </button>
                          <button
                            onClick={() => update(product._id)}
                            className="btn bg-orange-400 ml-2 mt-2 text-white hover:bg-black"
                          >
                            <BiEdit className="rounded-sm" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="addModal"
        tabIndex="-1"
        aria-labelledby="addModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addModalLabel">
                Ürün Ekle
              </h1>
              <button
                type="button"
                className="btn bg-black text-white"
                id="addModalCloseBtn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                X
              </button>
            </div>
            <form onSubmit={add}>
              <div className="modal-body">
                <div className="form-group">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Ürün Adı"
                  />
                </div>
                <div className="form-group mt-2">
                  <select
                    className="form-control"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  >
                    <option value={0}>Kategori Seç!</option>
                    <option>T-shirt</option>
                    <option>Sweetshirt</option>
                    <option>Coat</option>
                  </select>
                </div>
                <div className="form-group mt-2">
                  <input
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="form-control"
                    id="piece"
                    name="piece"
                    placeholder="Ürün Adeti"
                  />
                </div>
                <div className="form-group mt-2">
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-control"
                    id="price"
                    name="price"
                    placeholder="Ürün Fiyatı"
                  />
                </div>
                <div className="form-group mt-2">
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    placeholder="Ürün Fotoğrafı"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn bg-red-800 hover:bg-red-900 text-white"
                  data-bs-dismiss="modal"
                >
                  Kapat
                </button>
                <button
                  type="submit"
                  className="btn bg-blue-700 hover:bg-blue-800 text-white"
                >
                  Değişiklikleri Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductComponents;
