import CheckMark from '../../assets/svg/check-mark.svg';
type ListItemProps = {
  item: string;
};

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  return (
    <div key={item} className="price-list-item flex ">
      <CheckMark />
      <p className="font-medium rtl:text-base ltr:text-sm">{item}</p>
    </div>
  );
};
export default ListItem;
