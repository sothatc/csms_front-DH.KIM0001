import { Select } from 'components/atoms/Select/Select';
import styles from './EnterpriseSearchBox.module.scss';


const EnterpriseSearchBox = () => {

  return (
    <div className={styles.search}>
      <div className={styles.search__precondition}>
        <Select
          dataSet={[
            {value: 'client', text: "고객사"},
            {value: 'agent' , text: "협력사"},
          ]}
        />
        <Select
          dataSet={[
            {value: 'real'     , text:'실시간'},
            {value: 'semi-real', text:'준실시간'},
            {value: 'batch'    , text:'배치'},
            {value: 'self'     , text:'self(수동/단건)'},
          ]}
        />
      </div>
      <div className={styles.search__input}>
        <div className={`${styles['search__input--title']}`}>회사명</div>
        <input type='text'/>
      </div>
      <div className={styles.search__btn}>
        <button>검색</button>
      </div>
    </div>
  )
}

export {EnterpriseSearchBox};