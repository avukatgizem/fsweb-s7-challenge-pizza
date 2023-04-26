import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./PizzaForm.css";
import * as Yup from "yup";
import axios from "axios";

const PizzaForm = () => {
  const [size, setSize] = useState("");
  const [crust, setCrust] = useState("");
  const [selectedCrust, setSelectedCrust] = useState("");
  const [adet, setAdet] = useState(1);
  const [toppings, setToppings] = useState([]);
  const [special, setSpecial] = useState("");
  const [total, setTotal] = useState(85.5);
  const [secimler, setSecimler] = useState(0.0);
  const [errorMessage, setErrorMessage] = useState("");
  
  const history = useHistory();

  const a = 85.5;

  const PizzaFormSchema = Yup.object().shape({
    name: Yup.string(),
    placeholder: Yup.string().min(3, "En az 3 karakter girilmelidir."),
    toppings: Yup.array().test(
      "max-selected",
      "En fazla 3 seçenek seçilebilir.",
      (value) => {
        if (value && value.length > 3) {
          return false;
        }
        return true;
      }
    ),
  });

  

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };
  
  const handleCrustChange = (event) => {
    setCrust(event.target.value);
  };

  const handleToppingsChange = (event) => {
    const selectedToppings = Array.from(
      document.querySelectorAll('input[name="toppings"]:checked')
    ).map((input) => input.value);
    setToppings(selectedToppings);
  };

  const handleSpecialChange = (event) => {
    setSpecial(event.target.value);
  };

  const handleAdetChange = (newAdet) => {
    setAdet(newAdet);

    let secimler = toppings.length * newAdet * 5;
    setSecimler(secimler);

    let total = (a + toppings.length * 5) * newAdet;
    setTotal(total);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    PizzaFormSchema.validate({ toppings })
      .then(() => {
        const order = {
          size,
          toppings,
          special,
          Fiyat: total,
          adet,
        };

        axios
          .post("https://reqres.in/api/users", order)
          .then((response) => {
            console.log("Sipariş başarıyla gönderildi:", response);
            setSize("");
            setToppings([]);
            setSpecial("");
            history.push("/success");
          })
          .catch((error) => {
            console.error("Sipariş gönderilirken hata oluştu:", error);
          });
      });
  };

  return (
    <>
      <div className="container2">
        <div className="header">
          <div>
            <div>
              <h2 className="tekno">Teknolojik Yemekler</h2>
            </div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Anasayfa</Link>
                </li>
                <li>
                  <Link to="/secenekler">Seçenekler</Link>
                </li>
                <li>
                  <Link to="/order-pizza" style={{ fontWeight: "bold" }}>
                    Sipariş Oluştur
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="siparis-body">
        <br />
        <h2>Position Absolute Acı Pizza</h2>
        <br />
        <h3>85,50 ₺</h3>
        <p>
          Lezzetli pizza, ince hamurun üzerine sürülen domates sosu ve mozarella peyniriyle başlayan bir İtalyan yemeğidir. Bu temel malzemelere, birçok farklı lezzet ve çeşitlilik eklenir. Pizza yapımında kullanılan malzemeler arasında jambon, sosis, zeytin, mantar, biber, soğan, füme et ve diğer sebzeler yer alabilir. Pizzanın üzerine baharat ve otlar da eklenerek, zengin bir aroma sağlanır. Lezzetli pizza, fırında pişirilerek servis edilir ve sıcakken tüketilir.
        </p>
        <br />
        <form id="pizza-form" onSubmit={handleSubmit}>
        
<label htmlFor="size-dropdown">
Boyut Seç<span className="required">*</span>{" "}
</label>
      <select
id="size-dropdown"
value={size}
name="size-dropdown"
onChange={(event) => setSize(event.target.value)}
required
>
<option value="">--Boyut Seç--</option>
<option value="small">Küçük</option>
<option value="medium">Orta</option>
<option value="large">Büyük</option>
</select>
<br />
<br />
<label htmlFor="crust-dropdown">
Hamur Seç<span className="required">*</span>{" "}
</label>
<select
id="crust-dropdown"
value={crust}
name="crust-dropdown"
onChange={(event) => setCrust(event.target.value)}
required
>
<option value="">--Hamur Seç--</option>
<option value="ince">İnce</option>
<option value="normal">Normal</option>
<option value="kalın">Kalın</option>
</select>
<br />
          <br />
          <label htmlFor="toppings-checkboxes">
            <b>
              Ek Malzemeler<span className="required">*</span>
            </b>
          </label>{" "}
          <p>En Fazla 10 malzeme seçebilirsiniz. </p>
          <br />
          <div id="toppings-checkboxes">
            <label htmlFor="pepperoni-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="pepperoni"
                onChange={handleToppingsChange}
              />
              Pepperoni
            </label>
            <label htmlFor="mushrooms-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="mushrooms"
                onChange={handleToppingsChange}
              />
              Mantar
            </label>
            <label htmlFor="olives-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="olives"
                onChange={handleToppingsChange}
              />
              Zeytin
            </label>
            <label htmlFor="sausage-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="sausage"
                onChange={handleToppingsChange}
              />
              Sosis
            </label>
            <label htmlFor="domates-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="domates"
                onChange={handleToppingsChange}
              />
              Domates
            </label>
            <label htmlFor="biber-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="biber"
                onChange={handleToppingsChange}
              />
              Biber
            </label>
            <label htmlFor="sucuk-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="sucuk"
                onChange={handleToppingsChange}
              />
              Sucuk
            </label>
            <label htmlFor="kanadaJambonu-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="kanadaJambonu"
                onChange={handleToppingsChange}
              />
              Kanada Jambonu
            </label>
            <label htmlFor="tavukIzgara-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="tavukIzgara"
                onChange={handleToppingsChange}
              />
              Tavuk Izgara
            </label>
            <label htmlFor="jalepeno-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="jalepeno"
                onChange={handleToppingsChange}
              />
              Jalepeno
            </label>
            <label htmlFor="sarımsak-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="sarımsak"
                onChange={handleToppingsChange}
              />
              Sarımsak
            </label>
            <label htmlFor="kabak-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="kabak"
                onChange={handleToppingsChange}
              />
              Kabak
            </label>
            <label htmlFor="soğan-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="soğan"
                onChange={handleToppingsChange}
              />
              Soğan
            </label>
            <label htmlFor="ananas-checkbox">
              <input
                type="checkbox"
                name="toppings"
                value="ananas"
                onChange={handleToppingsChange}
              />
              Ananas
            </label>
          </div>
          <br />
          <br />
          <label htmlFor="special-text">Sipariş Notu</label>
          <br />
          <input
            type="text"
            id="special-text"
            name="special-text"
            value={special}
            onChange={handleSpecialChange}
            placeholder="Siparişine eklemek istediğin bir not var mı ?"
          />
          <br />
          <br />
          <div className="cizgi"></div>
          <br />
          <div className="adet-ve-siparis">
            <div className="adet-bolumu">
              <button
                className="minus-button"
                type="button"
                onClick={() => {
                  if (adet > 1) {
                    handleAdetChange(adet - 1);
                  }
                }}
              >
                -
              </button>

              <div className="adet-kutusu">
                <span className="adet-sayisi">{adet}</span>
              </div>

              <button
                className="plus-button"
                type="button"
                onClick={() => handleAdetChange(adet + 1)}
              >
                +
              </button>
            </div>

            <div className="siparis-bolumu">
              <div>Sipariş Toplamı</div>
              <div className="secimler">
                {" "}
                <span>Seçimler:</span> <span>{secimler} ₺</span>
              </div>
              <div className="secimler" style={{ color: " #ce2829" }}>
                <span>Toplam:</span> <span>{total} ₺</span>
              </div>

              <button id="order-button" type="submit">
                SİPARİŞ VER
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="footer"></div>
    </>
  );
};

export default PizzaForm;


