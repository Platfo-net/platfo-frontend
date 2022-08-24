import ListItem from "components/ListItem/ListItem";
import useTranslation from "next-translate/useTranslation";

type PriceBoxProps = {
  data: {
    price: number;
    items: string[];
    status: "active" | "disabled" | any;
    type: "gold" | "silver" | "bronze" | any;
  };

  onSubmit: (value: string) => void;
};

const PriceBox: React.FC<PriceBoxProps> = ({ data, onSubmit }) => {
  const { t } = useTranslation("common");
  return (
    <div className={`price-box ${data.status}`}>
      <div className={`type ${data.type} mb-5 font-extrabold`}>
        <p>{t(data.type)}</p>
      </div>
      {data.items.map((item) => {
        return <ListItem key={item} item={item} />;
      })}
      {data.status !== "disabled" ? (
        <div className="price my-4 font-extrabold">
          <p> {data.price.toLocaleString()} T</p>
          <p> {t("monthly")} </p>
        </div>
      ) : (
        <div className="price mt-4 my-5 font-extrabold">
          <p> {t("coming-soon")}</p>
        </div>
      )}
      <div>
        <button
          className="w-full primary"
          disabled={data.status === "disabled"}
        >
          {t("buy")}
        </button>
      </div>
    </div>
  );
};

export default PriceBox;
