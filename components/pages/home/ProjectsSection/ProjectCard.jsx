import Card from '@/components/ui/Card';

export default function ProjectCard({ p }) {
  return (
    <Card>
      <Card.Image
        src={p.image}
        alt={p.name}
        href={p.link}
        id={p.id}
        category={p.category}
        accent={p.accent}
      />
      <Card.Body>
        <div suppressHydrationWarning>
          <Card.Title>{p.name}</Card.Title>
          <Card.Category>{p.category}</Card.Category>
          <Card.Divider />
          <Card.Tags tags={p.skills} />
        </div>
        <Card.Action href={p.link} accent={p.accent} name={p.name} />
      </Card.Body>
    </Card>
  );
}


