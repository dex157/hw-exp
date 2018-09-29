import React, { PureComponent } from 'react';
import './Show.css';
import { getShowInfo } from '../../api';

class Show extends PureComponent {
  state = {
    showId: '',
    data: null
  };

  componentDidMount() {
    const { showId } = this.props;
    if (showId !== '') {
      getShowInfo(showId).then(data => {
        this.setState({ data, showId });
      });
    }
  }

  render() {
    const { showId, data } = this.state;
    if (showId === '') {
      return <p className="show-inforation t-show-info">Шоу не выбрано</p>;
    } else if (showId !== '' && data === null) {
      return (
        <p className="show-inforation t-show-info">
          Загрузка шоу с id {showId}
        </p>
      );
    }

    return (
      <div className="show">
        <img className="show-image" src={data.image.original} alt={data.name} />
        <h2 className="show-label t-show-name">{data.name}</h2>
        <p className="show-text t-show-genre">
          <b>Жанр: </b>
          {data.genres.join(', ')}
        </p>
        <p
          className="show-text t-show-summary"
          dangerouslySetInnerHTML={{ __html: data.summary }}
        />
      </div>
    );
  }
}

export default Show;
