import PropTypes from 'prop-types';

const Card = ({ href, imgSrc, imgAlt, title, description }) => {
  return (
    <a className="card" href={href}>
      <img src={imgSrc} alt={imgAlt} className="card-img" />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </a>
  );
};

Card.propTypes = {
  href: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card;
