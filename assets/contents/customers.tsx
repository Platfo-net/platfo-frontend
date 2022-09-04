import Image from "next/image";
import Farda from "../../assets/img/farda-bank.png";
import HiWeb from "../../assets/img/hiweb.jpg";
import havadarSC from "../../assets/img/havadar-sc.png";
import BimehFarda from "../../assets/img/bimeh-farda.jpg";
import IranZamin from "../../assets/img/iran-zamin-bank.png";
import ParsOnline from "../../assets/img/pars-online.png";
import AiMedic from "../../assets/img/aimedic.png";


const Customers = [
    {
        title: "farda-bank",
        key: "farda-bank",
        link: "https://fardabank.com",
        id:"farda-bank",
        logo:<Image src={Farda} alt="farda-bank" />,
    },
    {
        title: "hiWeb",
        key: "hiWeb",
        link: "https://www.hiweb.ir",
        id: "hiweb",
        logo:<Image src={HiWeb} alt="hiweb" />,
    },
    {
        title: "team-havadar",
        key: "team-havadar",
        link: "https://havadarsc.com",
        id: "havadar-sc",
        logo:<Image src={havadarSC} alt="havadar" />,
    },
    {
        title: "bimeh-farda",
        key: "bimeh-farda",
        link: "https://www.google.com/search?q=%D8%A8%DB%8C%D9%85%D9%87+%D9%87%D9%88%D8%B4%D9%85%D9%86%D8%AF+%D9%81%D8%B1%D8%AF%D8%A7",
        id: "bimeh-farda",
        logo: <Image src={BimehFarda} alt="bimeh-farda" />,
    },
    {
        title: "iran-zamin",
        key: "iran-zamin",
        link: "https://izbank.ir",
        id: "iran-zamin",
        logo:<Image src={IranZamin} alt="iran-zamin" />,
    },
    {
        title: "pars-online",
        key: "pars-online",
        link: "https://www.parsonline.com",
        id: "pars-online",
        logo: <Image src={ParsOnline} alt="pars-online" />,
    },
    {
        title: "aimedic",
        key: "aimedic",
        link: "https://aimedic.co",
        id: "aimedic",
        logo: <Image src={AiMedic} alt="aimedic" />,
    },

]

export default Customers;
