import styles from "./NoData.module.scss";
import noData from "../../assets/images/NoData.png";

type NoDataProps = {
  entity: string;
};

const NoData: React.FC<NoDataProps> = ({ entity }) => {
  return (
    <div className={styles.nodata__wrapper}>
      <img className={styles.nodata__img} src={noData} alt="There is No Data" />
      <p>
        There is no data found for {entity}. Add some new {entity} to view the
        result
      </p>
    </div>
  );
};

export default NoData;
