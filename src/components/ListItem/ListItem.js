export default function ListItem({ index, name, url }) {
  return (
    <div>
      {index}. <a href={url}>{name}</a>
    </div>
  );
}
