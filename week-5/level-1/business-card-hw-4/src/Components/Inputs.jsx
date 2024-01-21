export function Inputs({ props }) {
  return (
    <div>
      <div>
        <h2>{props.name}</h2>
        <p>{props.desc}</p>
        <h4>Interests</h4>
        <ul>
          <li>{props.interest1}</li>
          <li>{props.interest2}</li>
          <li>{props.interest3}</li>
        </ul>
        <a href={props.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={props.instagram} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </div>
    </div>
  );
}
