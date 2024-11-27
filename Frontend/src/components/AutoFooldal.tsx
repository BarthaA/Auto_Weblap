import Footer from "./Footer";
import Navbar from "./Navbar";
import "../assets/styles/style.css";
import "../assets/styles/autoFooldal.css";

const AutoFooldal = () => {
    return (
        <>
            <Navbar />
            <div className="landing-page">
                <h1>BrandNewCars Webshop</h1>
                <h2>Válassz modern autók fergetes kinálatából!</h2>
                <br />
                <p className="info-text">
                    Széles kínálattal várunk! Nálunk megtalálhatóak a legújabb
                    benzin-, és dízel motor hajtású autók a legkedvezőbb áron!
                    Minden autó null kiloméres, amire garanciát is vállalunk!
                    Vissza pörgetjük az összes kilométer órát ingyen!
                </p>
                <div className="image-container">
                    <img src="/public/main_page.jpg" alt="Main Image" />
                </div>
                <p className="info-text">
                    Amennyiben kiderül bármelyik autónkról, hogy használt
                    alkatrészeket tartalmaz, azok cseréjét új gyári alkatrészre,
                    vagy akár a teljes autó kicserélését is vállaljuk!
                </p>
                <br />
                <p className="info-text">
                    A legmegbizhatóbb európai auto beszállító cégekkel ápolunk
                    jó partner kapcsolatot, garanciát vállalunk a megrendelt
                    autó, raktárunkba való beérkezéshez számott 2 napon belüli
                    kiszállítására, akár hétvégén vagy ünnepnapon is!
                </p>
            </div>
            <Footer />
        </>
    );
};

export default AutoFooldal;
