import React from 'react';
import styles from './styles.module.css';

const Film = ({ data }) => {
  const image = (
    <img
      src={
        data.image
          ? `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`
          : 'https://via.placeholder.com/250x150'
      }
      alt={data.nameRU}
    />
  );
  return (
    <div>
      <div className={styles.img}>{image}</div>
      <p className={styles.name}>{data.nameRU}</p>
      <p className={styles.description}>{`${data.year}, ${data.country}`}</p>
      <p className={styles.description}>{`${data.duration} мин.`}</p>
    </div>
  );
};

const DEFAULT_STATE = {
  isLoading: false,
  hasError: false,
  data: []
}

export default function App() {
  const [state, setState] = React.useState(DEFAULT_STATE);
  const changeState = ({data, hasError, isLoading}) => {
    setState({
      ...state,
      data,
      hasError,
      isLoading
    });
  }
  
  React.useEffect(() => {
    const getFilms = async () => {
      changeState({hasError: false, isLoading: true});
      try {
        const res = await fetch('https://api.nomoreparties.co/123');
        const data = await res.json();
        changeState({isLoading: false, data, hasError: false});
      } catch {
        changeState({hasError: true, isLoading: false});
      }
    }
    getFilms();
  }, []);
  
    return (
      <div className={`${styles.app} ${styles.grid}`}>
        {state.isLoading && 'Загрузка...'}
        {state.hasError && 'Произошла ошибка'}
        {!state.isLoading &&
          !state.hasError &&
          state.data.length &&
          state.data.map((film, index) => <Film key={index} data={film} />)}
      </div>
    );
}