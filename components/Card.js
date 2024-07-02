// card.js
import PropTypes from 'prop-types';
import Image from 'next/image';

const Card = ({ href, imgSrc, imgAlt, title, description, size }) => {
  return (
    <a className={`card ${size}`} href={href}>
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
  size: PropTypes.oneOf(['small', 'medium', 'large']), // Add this line
};

Card.defaultProps = {
  size: 'medium', // Default size
};

export default Card;
