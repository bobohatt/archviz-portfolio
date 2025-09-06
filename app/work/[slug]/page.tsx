// app/work/[slug]/page.tsx
import { PROJECTS } from '@/lib/projects';
import ProjectClientView from './ProjectClientView';

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.id,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params; // Resolve the Promise
  const project = PROJECTS.find((p) => p.id === resolvedParams.slug);
  if (!project) {
    return null;
  }
  return <ProjectClientView project={project} />;
}