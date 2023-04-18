
function Card({ imageSrc, title, bullets, link }) {
  return (
    <div className="card">
      <img src={imageSrc} alt={title} />
      <div className="card-body">
        <h2>{title}</h2>
        <ul>
          {bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
        <a href={link} target="_blank" className="button">
          See more
        </a>
      </div>
    </div>
  );
}

export default Card;